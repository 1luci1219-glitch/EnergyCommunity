import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt="EnergiaLocală"
        width={34}
        height={34}
        className="shrink-0"
      />
      {!compact && (
        <span className="text-[1.05rem] font-semibold tracking-tight">
          EnergiaLocală
        </span>
      )}
    </Link>
  );
}
