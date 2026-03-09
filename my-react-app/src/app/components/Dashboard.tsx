import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Package, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { getDashboardData } from '../lib/api';
import type { DashboardData } from '../types';

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await getDashboardData());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your warehouse inventory
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-gray-200 animate-pulse h-24 rounded-lg" />
          <div className="bg-gray-200 animate-pulse h-24 rounded-lg" />
          <div className="bg-gray-200 animate-pulse h-24 rounded-lg" />
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : !data ? null : (
        <>
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
                        {data.totalProducts ?? 0}
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
                        {data.totalLocations ?? 0}
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
                        {(data.totalQuantity ?? 0).toLocaleString()}
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
              {(data.topLocations ?? []).length === 0 ? (
                <p className="text-gray-500">No inventory data available</p>
              ) : (
                <div className="space-y-3">
                  {(data.topLocations ?? []).map(({ location, quantity }) => (
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
        </>
      )}

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
