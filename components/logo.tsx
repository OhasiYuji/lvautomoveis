import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/logo.jpeg"
        alt="LV Automóveis"
        width={90}
        height={56}
        className="rounded-sm"
        priority
      />
    </span>
  );
}
