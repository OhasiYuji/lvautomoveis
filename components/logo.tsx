import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className ?? ""}`}>
      <Image
        src="/brand/logo.jpeg"
        alt="LV Automóveis"
        width={280}
        height={151}
        className="h-auto w-full object-contain"
        priority
      />
    </span>
  );
}
