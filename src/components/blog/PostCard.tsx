import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/content/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/onestoryworld/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-line bg-warm/50 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-warm"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-warm">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <h2 className="mt-5 font-display text-[clamp(24px,2.6vw,34px)] font-normal leading-[1.05] tracking-[-0.045em] transition-colors duration-300 group-hover:text-accent">
          {post.title}
        </h2>

        <p className="mt-4 flex-1 text-[16px] leading-[1.6] text-[#555149]">
          {post.excerpt}
        </p>

        <div className="mt-8 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent">
            Keep reading
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-muted">
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
