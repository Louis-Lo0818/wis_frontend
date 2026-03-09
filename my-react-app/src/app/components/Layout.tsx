import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Package, Upload, Search, ArrowLeftRight, Book, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard', icon: null, exact: true },
  { to: '/import', label: 'Import Data', icon: Upload, exact: false },
  { to: '/inventory', label: 'View Inventory', icon: Search, exact: false },
  { to: '/transfer', label: 'Transfer', icon: ArrowLeftRight, exact: false },
  { to: '/docs', label: 'Docs', icon: Book, exact: false },
];

export function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <span className="ml-2 text-xl font-semibold text-gray-900 truncate">
                Warehouse Inventory System
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden sm:flex sm:items-center sm:space-x-1">
              {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium border-b-2 h-16 transition-colors ${
                    isActive(to, exact)
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4 mr-2" />}
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white shadow-md">
            {NAV_LINKS.map(({ to, label, icon: Icon, exact }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-6 py-4 text-sm font-medium border-l-4 transition-colors ${
                  isActive(to, exact)
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                {label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}