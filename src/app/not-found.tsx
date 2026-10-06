import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-paper px-6 py-12 text-center font-sans text-ink">
      <div className="max-w-md">

        <h1 className="text-7xl font-bold tracking-tight sm:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-semibold sm:text-3xl">
          Page not found
        </h2>

        <p className="mt-3 text-base leading-7 opacity-60">
          Sorry, we couldn’t find the page you’re looking for. It may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  )
}

export default NotFound