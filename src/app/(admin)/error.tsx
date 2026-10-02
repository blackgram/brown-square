"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-full max-w-md flex-col items-start justify-center gap-4 px-4 py-24 text-ink">
      <h1 className="font-display text-3xl tracking-[-0.03em]">
        Something went wrong
      </h1>
      <p className="text-sm text-muted">
        The admin panel hit an unexpected error. If this keeps happening,
        share the reference below so it can be traced in the server logs.
      </p>
      {error.digest ? (
        <p className="border border-line bg-paper px-3 py-2 font-mono text-xs text-muted">
          Reference: {error.digest}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => retry()}
        className="border border-ink px-4 py-2 text-sm hover:bg-ink hover:text-paper"
      >
        Try again
      </button>
    </div>
  );
}
