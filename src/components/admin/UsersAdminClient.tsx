"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ADMIN_PERMISSIONS,
  type AdminPermission,
  type AdminUser,
  type UserRole,
} from "@/lib/auth/permissions";

export function UsersAdminClient() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [permissions, setPermissions] = useState<AdminPermission[]>([]);

  async function load() {
    const res = await fetch("/api/admin/users");
    const json = (await res.json()) as { users?: AdminUser[]; message?: string };
    if (!res.ok) {
      setError(json.message || "Failed to load users");
      return;
    }
    setUsers((json.users as AdminUser[]) || []);
  }

  useEffect(() => {
    void load();
  }, []);

  function togglePermission(permission: AdminPermission) {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission],
    );
  }

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          displayName,
          role,
          permissions,
        }),
      });
      const json = (await res.json()) as { message?: string };
      if (!res.ok) throw new Error(json.message || "Failed to create user");
      setStatus("User created");
      setEmail("");
      setPassword("");
      setDisplayName("");
      setRole("admin");
      setPermissions([]);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setPending(false);
    }
  }

  async function updateUser(
    uid: string,
    patch: { role?: UserRole; permissions?: AdminPermission[] },
  ) {
    setError(null);
    setStatus(null);
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, ...patch }),
    });
    const json = (await res.json()) as { message?: string };
    if (!res.ok) {
      setError(json.message || "Failed to update user");
      return;
    }
    setStatus("User updated");
    await load();
  }

  return (
    <div className="space-y-12">
      <form onSubmit={onCreate} className="max-w-xl space-y-4 border border-line bg-paper p-6">
        <h2 className="font-display text-2xl tracking-[-0.03em]">Create admin</h2>
        <label className="grid gap-1 text-sm">
          Display name
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="border-b border-ink bg-transparent py-2 outline-none"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b border-ink bg-transparent py-2 outline-none"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Temporary password
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-ink bg-transparent py-2 outline-none"
          />
        </label>
        <label className="grid gap-1 text-sm">
          Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="border border-line bg-paper px-3 py-2"
          >
            <option value="admin">Admin</option>
            <option value="super_admin">Super admin</option>
          </select>
        </label>
        {role === "admin" ? (
          <fieldset className="space-y-2 text-sm">
            <legend>Permissions</legend>
            {ADMIN_PERMISSIONS.map((permission) => (
              <label key={permission} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
                {permission}
              </label>
            ))}
          </fieldset>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create user"}
        </button>
      </form>

      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {status ? <p className="text-sm text-muted">{status}</p> : null}

      <div className="space-y-4">
        <h2 className="font-display text-2xl tracking-[-0.03em]">All users</h2>
        {users.map((user) => (
          <div
            key={user.uid}
            className="border border-line bg-paper p-5 text-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-medium">{user.displayName || user.email}</p>
                <p className="text-muted">{user.email}</p>
              </div>
              <select
                value={user.role}
                onChange={(e) =>
                  void updateUser(user.uid, {
                    role: e.target.value as UserRole,
                    permissions: user.permissions,
                  })
                }
                className="border border-line bg-paper px-3 py-2"
              >
                <option value="admin">Admin</option>
                <option value="super_admin">Super admin</option>
              </select>
            </div>
            {user.role === "admin" ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {ADMIN_PERMISSIONS.map((permission) => {
                  const checked = user.permissions.includes(permission);
                  return (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const next = checked
                            ? user.permissions.filter((p) => p !== permission)
                            : [...user.permissions, permission];
                          void updateUser(user.uid, {
                            role: "admin",
                            permissions: next,
                          });
                        }}
                      />
                      {permission}
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="mt-3 text-muted">Full access</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
