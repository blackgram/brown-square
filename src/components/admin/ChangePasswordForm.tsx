"use client";

import { FormEvent, useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    const user = getFirebaseAuth().currentUser;
    if (!user || !user.email) {
      setError("Your session has expired. Please sign in again to continue.");
      return;
    }

    setPending(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setStatus("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md space-y-5">
      <label className="grid gap-2 text-sm">
        <span>Current password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border-0 border-b border-ink bg-transparent py-2 outline-none"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>New password</span>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-0 border-b border-ink bg-transparent py-2 outline-none"
        />
      </label>
      <label className="grid gap-2 text-sm">
        <span>Confirm new password</span>
        <input
          type="password"
          required
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border-0 border-b border-ink bg-transparent py-2 outline-none"
        />
      </label>
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {status ? <p className="text-sm text-muted">{status}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="border border-ink px-4 py-3 text-sm transition-colors hover:bg-ink hover:text-paper disabled:opacity-50"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}

function mapAuthError(err: unknown): string {
  const code = (err as { code?: string } | null)?.code;
  switch (code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Current password is incorrect.";
    case "auth/weak-password":
      return "New password is too weak.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return err instanceof Error ? err.message : "Failed to update password.";
  }
}
