import Link from "next/link";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

const base =
  "inline-flex items-center gap-4 border border-ink px-4 py-3 transition-colors duration-200 hover:bg-ink hover:text-paper";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className = "",
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = `${base} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
