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
    <div className="flex items-center gap-2 border border-border bg-surface px-3 py-2">
      <Icon className="size-4 shrink-0 text-brand-orange" />
      <div>
        <p className="text-[11px] text-muted uppercase">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
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
        className="inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-brand-orange"
      >
        <ArrowLeft className="size-4" />
        Voltar ao estoque
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-surface">
            {coverPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPhoto.url} alt={label} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted">Sem foto</div>
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
                  className="aspect-video w-full rounded-sm border border-border object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand-orange uppercase">
              {vehicle.brand}
            </p>
            <h1 className="text-2xl font-bold text-foreground">{vehicle.model}</h1>
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

          <p className="border-y border-border py-4 text-4xl font-extrabold text-brand-orange">
            {formatCurrency(vehicle.price)}
          </p>

          <a
            href={whatsappLink(label)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-5" fill="currentColor" />
            Falar no WhatsApp
          </a>

          {vehicle.features.length > 0 && (
            <div>
              <h2 className="mb-2 font-bold text-foreground">Opcionais</h2>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-sm border border-border bg-surface px-3 py-1 text-sm text-foreground"
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
