"use client";

import { FormEvent, useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/site";

export function SiteAdminClient() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/site")
      .then((res) => res.json())
      .then((json: { settings?: SiteSettings; message?: string }) => {
        if (json.settings) setSettings(json.settings);
        else setError(json.message || "Failed to load settings");
      });
  }, []);

  async function onSave(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setPending(true);
    setError(null);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = (await res.json()) as {
        settings?: SiteSettings;
        message?: string;
      };
      if (!res.ok) throw new Error(json.message || "Save failed");
      if (json.settings) setSettings(json.settings);
      setStatus("Saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setPending(false);
    }
  }

  if (!settings) {
    return <p className="text-sm text-muted">{error || "Loading…"}</p>;
  }

  const fields: Array<keyof SiteSettings> = [
    "name",
    "tagline",
    "fullName",
    "description",
    "email",
    "reach",
    "footerTitle",
    "footerMeta",
  ];

  return (
    <form onSubmit={onSave} className="max-w-2xl space-y-4">
      {fields.map((key) => (
        <label key={key} className="grid gap-1 text-sm">
          <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          {key === "description" || key === "footerTitle" ? (
            <textarea
              value={settings[key]}
              onChange={(e) =>
                setSettings({ ...settings, [key]: e.target.value })
              }
              className="min-h-24 border border-line p-3 outline-none"
            />
          ) : (
            <input
              value={settings[key]}
              onChange={(e) =>
                setSettings({ ...settings, [key]: e.target.value })
              }
              className="border-b border-ink bg-transparent py-2 outline-none"
            />
          )}
        </label>
      ))}
      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {status ? <p className="text-sm text-muted">{status}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save site details"}
      </button>
    </form>
  );
}
