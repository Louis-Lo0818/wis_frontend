import axios from 'axios';
import type {
  Product,
  InventoryLevel,
  TransferRequest,
  DashboardData,
  ImportResult,
  FlatInventoryItem,
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

// ─── Products ────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products');
  return data;
}

// ─── Inventory ───────────────────────────────────────────────

function transformInventoryItems(items: FlatInventoryItem[], weightMap: Map<string, number>): InventoryLevel[] {
  const grouped = new Map<string, {
    productCode: string;
    productName: string;
    locations: { location: string; quantity: number }[];
    totalQuantity: number;
  }>();

  items.forEach((item) => {
    if (!grouped.has(item.productCode)) {
      grouped.set(item.productCode, {
        productCode: item.productCode,
        productName: item.productName,
        locations: [],
        totalQuantity: 0,
      });
    }
    const group = grouped.get(item.productCode)!;
    group.locations.push({ location: item.location, quantity: item.quantity });
    group.totalQuantity += item.quantity;
  });

  return Array.from(grouped.values()).map((g) => ({
    ...g,
    weight: weightMap.get(g.productCode) ?? 0, // Get weight from product data
  })) as InventoryLevel[];
}

export async function getInventoryLevels(): Promise<InventoryLevel[]> {
  const [inventoryData, productsData] = await Promise.all([
    api.get<FlatInventoryItem[]>('/inventory'),
    api.get<Product[]>('/products'),
  ]);
  
  const weightMap = new Map(productsData.data.map((p) => [p.code, p.weight]));
  return transformInventoryItems(inventoryData.data, weightMap);
}

export async function searchInventory(code: string): Promise<InventoryLevel[]> {
  const [inventoryData, productsData] = await Promise.all([
    api.get<FlatInventoryItem[]>('/inventory/search', { params: { code } }),
    api.get<Product[]>('/products'),
  ]);
  
  const weightMap = new Map(productsData.data.map((p) => [p.code, p.weight]));
  return transformInventoryItems(inventoryData.data, weightMap);
}

export async function getLocations(): Promise<string[]> {
  const { data } = await api.get<string[]>('/inventory/locations');
  return data;
}

// ─── Transfers ───────────────────────────────────────────────

export async function transferInventory(
  request: TransferRequest
): Promise<{ status: string; message: string }> {
  const { data } = await api.post<{ status: string; message: string }>(
    '/transfers',
    request
  );
  return data;
}

// ─── Import (multipart CSV) ──────────────────────────────────

export async function uploadProductsCsv(file: File): Promise<ImportResult> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post<ImportResult>('/import/products', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function uploadInventoryCsv(file: File): Promise<ImportResult> {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post<ImportResult>('/import/inventory', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// ─── Dashboard ───────────────────────────────────────────────

export async function getDashboardData(): Promise<DashboardData> {
  const { data } = await api.get<DashboardData>('/dashboard');
  return data;
}

// ─── Error helper ────────────────────────────────────────────

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { message?: string })?.message ?? err.message;
  }
  return 'An unexpected error occurred';
}
