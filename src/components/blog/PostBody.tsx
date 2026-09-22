import Image from "next/image";
import type { Post } from "@/content/posts";

export function PostBody({ post }: { post: Post }) {
  return (
    <article>
      <div className="text-[11px] uppercase tracking-[0.12em] text-muted">
        {post.category} · {formatDate(post.date)} · {post.readingTime}
      </div>
      <h1 className="mt-6 max-w-[1100px] font-display text-[clamp(48px,7vw,96px)] font-normal leading-[0.9] tracking-[-0.055em]">
        {post.title}
      </h1>

      <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden bg-warm">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          priority
          sizes="(max-width: 1380px) 100vw, 1380px"
          className="object-cover"
        />
      </div>

      <div className="mt-12 space-y-6 border-t border-line pt-12">
        {post.body.map((paragraph, index) => (
          <p key={index} className="text-[18px] leading-[1.7]">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
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
