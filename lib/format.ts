export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function formatKm(value: number) {
  return `${value.toLocaleString("pt-BR")} km`;
}

const CONDITION_LABEL: Record<string, string> = {
  new: "Novo",
  used: "Seminovo",
};

export function formatCondition(value: string) {
  return CONDITION_LABEL[value] ?? value;
}

export function whatsappLink(vehicleLabel: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent(
    `Olá! Tenho interesse no ${vehicleLabel} que vi no site da LV Automóveis.`,
  );
  return `https://wa.me/${number}?text=${message}`;
}

export function whatsappGeneralLink() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os veículos disponíveis.");
  return `https://wa.me/${number}?text=${message}`;
}
