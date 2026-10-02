"use client";

import { useEffect, useMemo, useState } from "react";

type WaitlistEntry = {
  id: string;
  sessionType: "private" | "open";
  surname: string;
  otherNames: string;
  email: string;
  phone: string;
  ageRange: string | null;
  country: string | null;
  stateRegion: string | null;
  cityTown: string | null;
  description: string | null;
  industry: string | null;
  education: string | null;
  fieldOfStudy: string | null;
  currentWork: string | null;
  understanding: string | null;
  interest: string | null;
  hearAbout: string | null;
  inPersonWilling: string | null;
  createdAt: string;
};

type Filter = "all" | "private" | "open";

export function ThipAdminClient() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/thip");
    const json = (await res.json()) as {
      entries?: WaitlistEntry[];
      message?: string;
    };
    if (!res.ok) {
      setError(json.message || "Failed to load waitlist entries");
      setLoading(false);
      return;
    }
    setEntries(json.entries || []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onDelete(id: string) {
    if (!confirm("Remove this entry from the waitlist?")) return;
    const res = await fetch(`/api/admin/thip?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const json = (await res.json()) as { message?: string };
      setError(json.message || "Delete failed");
      return;
    }
    await load();
  }

  const filtered = useMemo(
    () =>
      filter === "all" ? entries : entries.filter((e) => e.sessionType === filter),
    [entries, filter],
  );

  const counts = useMemo(
    () => ({
      all: entries.length,
      private: entries.filter((e) => e.sessionType === "private").length,
      open: entries.filter((e) => e.sessionType === "open").length,
    }),
    [entries],
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2 text-sm">
          {(
            [
              { key: "all", label: `All (${counts.all})` },
              { key: "private", label: `Private (${counts.private})` },
              { key: "open", label: `Open (${counts.open})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={
                filter === tab.key
                  ? "border border-ink bg-ink px-4 py-2 text-paper"
                  : "border border-line px-4 py-2 text-muted hover:text-ink"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm text-muted hover:text-ink"
        >
          Refresh
        </button>
      </div>

      {error ? <p className="text-sm text-accent">{error}</p> : null}
      {loading ? <p className="text-sm text-muted">Loading…</p> : null}

      {!loading && filtered.length === 0 ? (
        <p className="text-sm text-muted">No waitlist entries yet.</p>
      ) : null}

      <div className="divide-y divide-line border border-line bg-paper">
        {filtered.map((entry) => {
          const expanded = expandedId === entry.id;
          return (
            <div key={entry.id} className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-medium">
                    {entry.otherNames} {entry.surname}
                    <span className="ml-2 border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      {entry.sessionType}
                    </span>
                  </p>
                  <p className="text-xs text-muted">
                    {entry.email} · {entry.phone} ·{" "}
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : entry.id)}
                    className="hover:text-accent"
                  >
                    {expanded ? "Hide details" : "View details"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDelete(entry.id)}
                    className="text-accent"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {expanded ? (
                <div className="mt-4 grid gap-3 border-t border-line pt-4 text-sm sm:grid-cols-2">
                  <Detail label="Age range" value={entry.ageRange} />
                  <Detail label="Country" value={entry.country} />
                  <Detail label="State / Region" value={entry.stateRegion} />
                  <Detail label="City / Town" value={entry.cityTown} />
                  <Detail label="Describes them" value={entry.description} />
                  <Detail label="Industry" value={entry.industry} />
                  <Detail label="Education" value={entry.education} />
                  <Detail label="Field of study" value={entry.fieldOfStudy} />
                  <Detail
                    label="In-person willing"
                    value={entry.inPersonWilling}
                  />
                  <Detail label="Heard about via" value={entry.hearAbout} />
                  <Detail
                    full
                    label="Currently building / doing"
                    value={entry.currentWork}
                  />
                  <Detail
                    full
                    label="What they wish they understood"
                    value={entry.understanding}
                  />
                  <Detail
                    full
                    label="Why THIP interests them"
                    value={entry.interest}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string | null;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1">{value || "—"}</p>
    </div>
  );
}
