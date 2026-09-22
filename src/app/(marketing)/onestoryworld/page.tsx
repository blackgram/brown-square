import type { Metadata } from "next";
import Image from "next/image";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Shell";
import { PostCard } from "@/components/blog/PostCard";
import { getBlogClient } from "@/lib/blog";

export const metadata: Metadata = {
  title: "One Story World",
  description:
    "Explaining the world one story at a time — from One Story World by BrownSquare.",
};

export default async function OneStoryWorldPage() {
  const posts = await getBlogClient().listPosts();

  return (
    <Shell className="py-10 md:py-14">
      <Stagger immediate>
        <StaggerItem>
          <Image
            src="/onestoryworldlogo.png"
            alt="One Story World"
            width={420}
            height={84}
            className="h-12 w-auto md:h-14"
            priority
          />
        </StaggerItem>
        <StaggerItem>
          <h1 className="mt-6 font-display text-[clamp(52px,7vw,100px)] font-normal leading-[0.88] tracking-[-0.055em]">
            Explaining the world one story at a time.
          </h1>
        </StaggerItem>
      </Stagger>
      <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <StaggerItem key={post.slug} className="h-full">
            <PostCard post={post} />
          </StaggerItem>
        ))}
      </Stagger>
    </Shell>
  );
}
