import Link from "next/link";
import { Shell } from "@/components/ui/Shell";

type Props = {
  searchParams: Promise<{ reference?: string }>;
};

export const metadata = {
  title: "Payment successful",
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { reference } = await searchParams;

  return (
    <Shell className="py-16 md:py-24">
      <h1 className="font-display text-[clamp(40px,6vw,72px)] tracking-[-0.05em]">
        Payment received.
      </h1>
      <p className="mt-6 max-w-xl text-[18px] leading-[1.6] text-[#555149]">
        Thank you. We&apos;ll follow up by email with next steps for your
        BrownSquare Toolkit order.
      </p>
      {reference ? (
        <p className="mt-4 text-sm text-muted">Reference: {reference}</p>
      ) : null}
      <Link
        href="/store"
        className="mt-10 inline-flex border border-ink px-4 py-3 text-sm hover:bg-ink hover:text-paper"
      >
        Back to store
      </Link>
    </Shell>
  );
}
