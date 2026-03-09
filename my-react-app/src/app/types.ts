export interface Product {
  code: string;
  name: string;
  weight: number;
}

export interface InventoryItem {
  productCode: string;
  location: string;
  quantity: number;
}

export interface InventoryLevel {
  productCode: string;
  productName: string;
  weight: number;
  locations: {
    location: string;
    quantity: number;
  }[];
  totalQuantity: number;
}

export interface TransferRequest {
  productCode: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
}

export interface DashboardData {
  totalProducts: number;
  totalLocations: number;
  totalQuantity: number;
  topLocations: { location: string; quantity: number }[];
}

export interface ImportResult {
  success: boolean;
  importedCount: number;
  skippedCount: number;
  errors: string[];
}

export interface FlatInventoryItem {
  productCode: string;
  productName: string;
  location: string;
  quantity: number;
}
