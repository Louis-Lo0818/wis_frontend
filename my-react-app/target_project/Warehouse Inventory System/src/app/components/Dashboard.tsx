import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Package, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { storage } from '../lib/storage';
import { Product, InventoryItem } from '../types';

export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(storage.getProducts());
    setInventory(storage.getInventory());
  };

  const totalProducts = products.length;
  const totalLocations = new Set(inventory.map(i => i.location)).size;
  const totalUnits = inventory.reduce((sum, i) => sum + i.quantity, 0);

  const locationSummary = inventory.reduce((acc, item) => {
    if (!acc[item.location]) {
      acc[item.location] = 0;
    }
    acc[item.location] += item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const topLocations = Object.entries(locationSummary)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your warehouse inventory
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Products
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {totalProducts}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Locations
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {totalLocations}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Units
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {totalUnits.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Locations */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Top Locations by Inventory
          </h2>
        </div>
        <div className="px-6 py-4">
          {topLocations.length === 0 ? (
            <p className="text-gray-500">No inventory data available</p>
          ) : (
            <div className="space-y-3">
              {topLocations.map(([location, quantity]) => (
                <div key={location} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">{location}</span>
                  </div>
                  <span className="text-gray-600">
                    {quantity.toLocaleString()} units
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        </div>
        <div className="px-6 py-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            to="/import"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div>
              <p className="font-medium text-gray-900">Import Data</p>
              <p className="text-sm text-gray-500">Upload CSV files</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
          </Link>

          <Link
            to="/inventory"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div>
              <p className="font-medium text-gray-900">View Inventory</p>
              <p className="text-sm text-gray-500">Search products</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
          </Link>

          <Link
            to="/transfer"
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all group"
          >
            <div>
              <p className="font-medium text-gray-900">Transfer Stock</p>
              <p className="text-sm text-gray-500">Move between locations</p>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}
