import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Shell";
import { PostBody } from "@/components/blog/PostBody";
import { getBlogClient } from "@/lib/blog";
import { posts } from "@/content/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogClient().getPost(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function OneStoryWorldPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogClient().getPost(slug);
  if (!post) notFound();

  return (
    <Shell className="py-10 md:py-14">
      <Reveal immediate className="flex items-center justify-between gap-6">
        <Link
          href="/onestoryworld"
          className="text-[11px] uppercase tracking-[0.12em] text-muted hover:text-ink"
        >
          ← One Story World
        </Link>
        <Image
          src="/onestoryworldlogo.png"
          alt="One Story World"
          width={280}
          height={56}
          className="h-9 w-auto"
        />
      </Reveal>
      <Reveal immediate delay={0.08} className="mt-10">
        <PostBody post={post} />
      </Reveal>
    </Shell>
  );
}
