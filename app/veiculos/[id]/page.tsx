import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Gauge, Palette, Fuel, Cog, BadgeCheck, MessageCircle } from "lucide-react";
import { getVehicle } from "@/lib/api";
import { formatCurrency, formatKm, formatCondition, whatsappLink } from "@/lib/format";

function SpecItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="border-border bg-surface flex items-center gap-2 rounded-md border px-3 py-2">
      <Icon className="text-gold-2 size-4 shrink-0" />
      <div>
        <p className="text-muted text-[11px] uppercase">{label}</p>
        <p className="text-foreground text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);
  if (!vehicle) notFound();

  const label = `${vehicle.brand} ${vehicle.model}`;
  const coverPhoto = vehicle.photos.find((p) => p.is_cover) ?? vehicle.photos[0];
  const otherPhotos = vehicle.photos.filter((p) => p !== coverPhoto);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <Link
        href="/"
        className="text-muted inline-flex w-fit items-center gap-1 text-sm transition-colors hover:text-[var(--gold-2)]"
      >
        <ArrowLeft className="size-4" />
        Voltar ao estoque
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="border-border bg-surface aspect-[4/3] w-full overflow-hidden rounded-lg border">
            {coverPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPhoto.url} alt={label} className="h-full w-full object-cover" />
            ) : (
              <div className="text-muted flex h-full w-full items-center justify-center">Sem foto</div>
            )}
          </div>
          {otherPhotos.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {otherPhotos.map((photo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={photo.url}
                  src={photo.url}
                  alt={label}
                  className="border-border aspect-video w-full rounded-md border object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-gold-gradient text-sm font-semibold tracking-wide uppercase">
              {vehicle.brand}
            </p>
            <h1 className="text-foreground text-2xl font-bold">{vehicle.model}</h1>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <SpecItem
              icon={Calendar}
              label="Ano"
              value={`${vehicle.manufacture_year ?? "—"}/${vehicle.model_year ?? "—"}`}
            />
            <SpecItem icon={Gauge} label="Km" value={formatKm(vehicle.km)} />
            <SpecItem icon={Palette} label="Cor" value={vehicle.color ?? "—"} />
            <SpecItem icon={Fuel} label="Combustível" value={vehicle.fuel_type ?? "—"} />
            <SpecItem icon={Cog} label="Câmbio" value={vehicle.transmission_type ?? "—"} />
            <SpecItem icon={BadgeCheck} label="Condição" value={formatCondition(vehicle.condition)} />
          </div>

          <p className="border-border text-gold-gradient border-y py-4 text-4xl font-extrabold">
            {formatCurrency(vehicle.price)}
          </p>

          <a
            href={whatsappLink(label)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-5" fill="currentColor" />
            Falar no WhatsApp
          </a>

          {vehicle.features.length > 0 && (
            <div>
              <h2 className="text-foreground mb-2 font-bold">Opcionais</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature) => (
                  <span
                    key={feature}
                    className="border-border bg-surface text-foreground rounded-md border px-3 py-1 text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
