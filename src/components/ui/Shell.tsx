import { type ReactNode } from "react";

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[min(1380px,calc(100%-64px))] max-md:w-[min(100%-32px,1380px)] ${className}`}>
      {children}
    </div>
  );
}
