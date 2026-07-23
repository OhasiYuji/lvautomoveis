import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <Image
        src="/logo.jpeg"
        alt="LV Automóveis"
        width={56}
        height={56}
        className="rounded-sm"
        priority
      />
      <span className="text-xl leading-tight font-extrabold tracking-tight text-brand-black">
        LV <span className="text-brand-orange">AUTOMÓVEIS</span>
      </span>
    </span>
  );
}
