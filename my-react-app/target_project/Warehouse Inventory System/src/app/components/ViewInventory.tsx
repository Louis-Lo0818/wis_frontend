import { useState, useEffect } from 'react';
import { Search, Package, MapPin, Weight } from 'lucide-react';
import { storage } from '../lib/storage';
import { Product, InventoryItem, InventoryLevel } from '../types';

export function ViewInventory() {
  const [searchCode, setSearchCode] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryLevel[]>([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterInventory();
  }, [searchCode, products, inventory, showAll]);

  const loadData = () => {
    setProducts(storage.getProducts());
    setInventory(storage.getInventory());
  };

  const filterInventory = () => {
    const productMap = new Map(products.map(p => [p.code, p]));
    const inventoryMap = new Map<string, InventoryLevel>();

    // Filter inventory items
    const itemsToProcess = searchCode.trim()
      ? inventory.filter(i => 
          i.productCode.toLowerCase().includes(searchCode.toLowerCase())
        )
      : inventory;

    // Group by product code
    itemsToProcess.forEach(item => {
      const product = productMap.get(item.productCode);
      
      if (!inventoryMap.has(item.productCode)) {
        inventoryMap.set(item.productCode, {
          productCode: item.productCode,
          productName: product?.name || 'Unknown Product',
          weight: product?.weight || 0,
          locations: [],
          totalQuantity: 0
        });
      }

      const level = inventoryMap.get(item.productCode)!;
      level.locations.push({
        location: item.location,
        quantity: item.quantity
      });
      level.totalQuantity += item.quantity;
    });

    // If showing all and no search, include products with no inventory
    if (showAll && !searchCode.trim()) {
      products.forEach(product => {
        if (!inventoryMap.has(product.code)) {
          inventoryMap.set(product.code, {
            productCode: product.code,
            productName: product.name,
            weight: product.weight,
            locations: [],
            totalQuantity: 0
          });
        }
      });
    }

    const result = Array.from(inventoryMap.values())
      .sort((a, b) => a.productCode.localeCompare(b.productCode));

    setFilteredInventory(result);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterInventory();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">View Inventory</h1>
        <p className="mt-1 text-sm text-gray-500">
          Search and view inventory levels by product code
        </p>
      </div>

      {/* Search */}
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search by Product Code
            </label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="Enter product code (e.g., PRD001)"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showAll"
              checked={showAll}
              onChange={(e) => setShowAll(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showAll" className="ml-2 text-sm text-gray-700">
              Show products with zero inventory
            </label>
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredInventory.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-12 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">
              {searchCode ? 'No products found matching your search' : 'No inventory data available'}
            </p>
          </div>
        ) : (
          filteredInventory.map((level) => (
            <div key={level.productCode} className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Package className="h-6 w-6 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {level.productName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Code: {level.productCode}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {level.totalQuantity.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Total Units</div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <Weight className="h-4 w-4 mr-2" />
                  Weight: {level.weight} kg per unit
                </div>

                {level.locations.length === 0 ? (
                  <p className="text-sm text-gray-500 italic">No inventory at any location</p>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Locations:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {level.locations
                        .sort((a, b) => b.quantity - a.quantity)
                        .map((loc) => (
                          <div
                            key={loc.location}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                          >
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="font-medium text-gray-900">
                                {loc.location}
                              </span>
                            </div>
                            <span className="text-gray-600">
                              {loc.quantity.toLocaleString()}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
