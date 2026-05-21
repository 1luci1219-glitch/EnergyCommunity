import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
  className,
  size = "md",
}: {
  compact?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const heights: Record<string, number> = { sm: 32, md: 42, lg: 52 };
  const h = heights[size];

  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/logo2.png"
        alt="EnergiaLocală"
        height={h}
        width={h * 4}
        className={cn(
          "w-auto shrink-0 object-contain",
          size === "sm" && "h-8",
          size === "md" && "h-10",
          size === "lg" && "h-12",
        )}
        priority
      />
      {!compact && size === "sm" && (
        <span className="ml-2.5 font-heading text-sm font-semibold tracking-tight">
          EnergiaLocală
        </span>
      )}
    </Link>
  );
}
