import { Product, InventoryItem } from '../types';

const PRODUCTS_KEY = 'wis_products';
const INVENTORY_KEY = 'wis_inventory';

// Initialize with sample data
const SAMPLE_PRODUCTS: Product[] = [
  { code: 'PRD001', name: 'Laptop Computer', weight: 2.5 },
  { code: 'PRD002', name: 'Wireless Mouse', weight: 0.1 },
  { code: 'PRD003', name: 'USB-C Cable', weight: 0.05 },
  { code: 'PRD004', name: 'Monitor 27"', weight: 5.2 },
  { code: 'PRD005', name: 'Keyboard Mechanical', weight: 1.1 },
];

const SAMPLE_INVENTORY: InventoryItem[] = [
  { productCode: 'PRD001', location: 'TKO', quantity: 150 },
  { productCode: 'PRD001', location: 'CSW', quantity: 75 },
  { productCode: 'PRD001', location: 'KWN', quantity: 50 },
  { productCode: 'PRD002', location: 'TKO', quantity: 500 },
  { productCode: 'PRD002', location: 'CSW', quantity: 300 },
  { productCode: 'PRD003', location: 'TKO', quantity: 1000 },
  { productCode: 'PRD003', location: 'KWN', quantity: 800 },
  { productCode: 'PRD004', location: 'CSW', quantity: 200 },
  { productCode: 'PRD004', location: 'TKO', quantity: 100 },
  { productCode: 'PRD005', location: 'KWN', quantity: 250 },
];

export const storage = {
  // Products
  getProducts(): Product[] {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      this.saveProducts(SAMPLE_PRODUCTS);
      return SAMPLE_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProducts(products: Product[]): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  addProducts(newProducts: Product[]): void {
    const existing = this.getProducts();
    const productMap = new Map(existing.map(p => [p.code, p]));
    
    newProducts.forEach(p => productMap.set(p.code, p));
    
    this.saveProducts(Array.from(productMap.values()));
  },

  // Inventory
  getInventory(): InventoryItem[] {
    const stored = localStorage.getItem(INVENTORY_KEY);
    if (!stored) {
      this.saveInventory(SAMPLE_INVENTORY);
      return SAMPLE_INVENTORY;
    }
    return JSON.parse(stored);
  },

  saveInventory(inventory: InventoryItem[]): void {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  },

  addInventory(newItems: InventoryItem[]): void {
    const existing = this.getInventory();
    const inventoryMap = new Map(
      existing.map(i => [`${i.productCode}_${i.location}`, i])
    );

    newItems.forEach(item => {
      const key = `${item.productCode}_${item.location}`;
      const current = inventoryMap.get(key);
      
      if (current) {
        inventoryMap.set(key, {
          ...current,
          quantity: current.quantity + item.quantity
        });
      } else {
        inventoryMap.set(key, item);
      }
    });

    this.saveInventory(Array.from(inventoryMap.values()));
  },

  transferInventory(
    productCode: string,
    fromLocation: string,
    toLocation: string,
    quantity: number
  ): { success: boolean; error?: string } {
    const inventory = this.getInventory();
    const fromKey = `${productCode}_${fromLocation}`;
    const toKey = `${productCode}_${toLocation}`;
    
    const fromIndex = inventory.findIndex(
      i => i.productCode === productCode && i.location === fromLocation
    );
    
    if (fromIndex === -1) {
      return { success: false, error: 'Source location not found' };
    }
    
    if (inventory[fromIndex].quantity < quantity) {
      return { success: false, error: 'Insufficient quantity' };
    }

    // Deduct from source
    inventory[fromIndex].quantity -= quantity;

    // Add to destination
    const toIndex = inventory.findIndex(
      i => i.productCode === productCode && i.location === toLocation
    );
    
    if (toIndex === -1) {
      inventory.push({ productCode, location: toLocation, quantity });
    } else {
      inventory[toIndex].quantity += quantity;
    }

    // Remove zero quantity entries
    const filtered = inventory.filter(i => i.quantity > 0);
    
    this.saveInventory(filtered);
    return { success: true };
  },

  clearAll(): void {
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(INVENTORY_KEY);
  }
};
