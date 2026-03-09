import { Outlet, Link, useLocation } from 'react-router';
import { Package, Upload, Search, ArrowLeftRight, Book } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">
                  Warehouse Inventory System
                </span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                <Link
                  to="/"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive('/')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/import"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive('/import')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Link>
                <Link
                  to="/inventory"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive('/inventory')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Search className="h-4 w-4 mr-2" />
                  View Inventory
                </Link>
                <Link
                  to="/transfer"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive('/transfer')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Transfer
                </Link>
                <Link
                  to="/docs"
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    isActive('/docs')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Book className="h-4 w-4 mr-2" />
                  Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}