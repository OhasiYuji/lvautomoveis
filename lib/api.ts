const API_BASE_URL = process.env.NEXT_PUBLIC_MYXMOTORS_API_URL;
const STORE_SLUG = process.env.NEXT_PUBLIC_STORE_SLUG;

export interface VehicleListItem {
  id: string;
  brand: string;
  model: string;
  fuel_type: string | null;
  transmission_type: string | null;
  manufacture_year: number | null;
  model_year: number | null;
  color: string | null;
  km: number;
  condition: string;
  price: number;
  cover_photo_url: string | null;
}

export interface VehicleListResponse {
  loja: string;
  items: VehicleListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface VehiclePhoto {
  url: string;
  is_cover: boolean;
}

export interface VehicleDetail {
  id: string;
  loja: string;
  brand: string;
  model: string;
  fuel_type: string | null;
  transmission_type: string | null;
  manufacture_year: number | null;
  model_year: number | null;
  color: string | null;
  km: number;
  condition: string;
  price: number;
  photos: VehiclePhoto[];
  features: string[];
}

export async function listVehicles(page = 1, pageSize = 50): Promise<VehicleListResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/lojas/${STORE_SLUG}/veiculos?page=${page}&pageSize=${pageSize}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error("Erro ao carregar o estoque.");
  return res.json();
}

export async function getVehicle(id: string): Promise<VehicleDetail | null> {
  const res = await fetch(
    `${API_BASE_URL}/api/public/lojas/${STORE_SLUG}/veiculos/${id}`,
    { next: { revalidate: 60 } },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Erro ao carregar o veículo.");
  return res.json();
}
