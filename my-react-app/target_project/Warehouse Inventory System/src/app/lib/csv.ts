import { Product, InventoryItem } from '../types';

export function parseProductsCSV(csvText: string): Product[] {
  const lines = csvText.trim().split('\n');
  const products: Product[] = [];
  
  // Skip header if it exists
  const startIndex = lines[0].toLowerCase().includes('code') || 
                     lines[0].toLowerCase().includes('name') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',').map(p => p.trim());
    
    if (parts.length >= 3) {
      products.push({
        code: parts[0],
        name: parts[1],
        weight: parseFloat(parts[2]) || 0
      });
    }
  }
  
  return products;
}

export function parseInventoryCSV(csvText: string): InventoryItem[] {
  const lines = csvText.trim().split('\n');
  const items: InventoryItem[] = [];
  
  // Skip header if it exists
  const startIndex = lines[0].toLowerCase().includes('product') || 
                     lines[0].toLowerCase().includes('location') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',').map(p => p.trim());
    
    if (parts.length >= 3) {
      items.push({
        productCode: parts[0],
        location: parts[1],
        quantity: parseInt(parts[2]) || 0
      });
    }
  }
  
  return items;
}

export function generateProductsCSV(products: Product[]): string {
  const header = 'code,name,weight\n';
  const rows = products.map(p => `${p.code},${p.name},${p.weight}`).join('\n');
  return header + rows;
}

export function generateInventoryCSV(inventory: InventoryItem[]): string {
  const header = 'productCode,location,quantity\n';
  const rows = inventory.map(i => `${i.productCode},${i.location},${i.quantity}`).join('\n');
  return header + rows;
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
