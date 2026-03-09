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
