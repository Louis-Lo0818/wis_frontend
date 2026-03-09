import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { storage } from '../lib/storage';
import { Product, InventoryItem } from '../types';

export function TransferInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [productCode, setProductCode] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setProducts(storage.getProducts());
    setInventory(storage.getInventory());
  };

  const availableLocations = Array.from(
    new Set(inventory.map(i => i.location))
  ).sort();

  const getAvailableQuantity = () => {
    if (!productCode || !fromLocation) return 0;
    const item = inventory.find(
      i => i.productCode === productCode && i.location === fromLocation
    );
    return item?.quantity || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    setMessage('');

    // Validation
    if (!productCode || !fromLocation || !toLocation || !quantity) {
      setStatus('error');
      setMessage('Please fill in all fields');
      return;
    }

    if (fromLocation === toLocation) {
      setStatus('error');
      setMessage('Source and destination locations must be different');
      return;
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      setStatus('error');
      setMessage('Quantity must be a positive number');
      return;
    }

    const available = getAvailableQuantity();
    if (qty > available) {
      setStatus('error');
      setMessage(`Insufficient quantity. Available: ${available}`);
      return;
    }

    // Perform transfer
    const result = storage.transferInventory(
      productCode,
      fromLocation,
      toLocation,
      qty
    );

    if (result.success) {
      setStatus('success');
      setMessage(
        `Successfully transferred ${qty} units of ${productCode} from ${fromLocation} to ${toLocation}`
      );
      // Reload data
      loadData();
      // Clear form
      setProductCode('');
      setFromLocation('');
      setToLocation('');
      setQuantity('');
    } else {
      setStatus('error');
      setMessage(result.error || 'Transfer failed');
    }
  };

  const selectedProduct = products.find(p => p.code === productCode);
  const availableQty = getAvailableQuantity();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Transfer Inventory</h1>
        <p className="mt-1 text-sm text-gray-500">
          Move inventory between warehouse locations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transfer Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Transfer Details</h2>
          </div>
          <div className="px-6 py-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code
                </label>
                <select
                  id="productCode"
                  value={productCode}
                  onChange={(e) => {
                    setProductCode(e.target.value);
                    setFromLocation('');
                    setToLocation('');
                    setStatus('idle');
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.code} value={product.code}>
                      {product.code} - {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    From Location
                  </label>
                  <select
                    id="fromLocation"
                    value={fromLocation}
                    onChange={(e) => {
                      setFromLocation(e.target.value);
                      setStatus('idle');
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={!productCode}
                  >
                    <option value="">Select location</option>
                    {availableLocations
                      .filter(loc => 
                        inventory.some(i => 
                          i.productCode === productCode && 
                          i.location === loc &&
                          i.quantity > 0
                        )
                      )
                      .map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="toLocation" className="block text-sm font-medium text-gray-700 mb-2">
                    To Location
                  </label>
                  <input
                    type="text"
                    id="toLocation"
                    value={toLocation}
                    onChange={(e) => {
                      setToLocation(e.target.value.toUpperCase().replace(/\s/g, ''));
                      setStatus('idle');
                    }}
                    placeholder="e.g., TKO"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setStatus('idle');
                  }}
                  min="1"
                  max={availableQty}
                  placeholder="Enter quantity"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {fromLocation && (
                  <p className="mt-1 text-sm text-gray-500">
                    Available: {availableQty.toLocaleString()} units
                  </p>
                )}
              </div>

              {status !== 'idle' && (
                <div
                  className={`flex items-center p-4 rounded-lg ${
                    status === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                  )}
                  <span className="text-sm">{message}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!productCode || !fromLocation || !toLocation || !quantity}
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Transfer Inventory
              </button>
            </form>
          </div>
        </div>

        {/* Transfer Preview */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Transfer Preview</h2>
          </div>
          <div className="px-6 py-5">
            {!productCode ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-gray-500">Select a product to preview transfer</p>
              </div>
            ) : (
              <div className="space-y-6">
                {selectedProduct && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Product Details</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Name:</span> {selectedProduct.name}</p>
                      <p><span className="font-medium">Code:</span> {selectedProduct.code}</p>
                      <p><span className="font-medium">Weight:</span> {selectedProduct.weight} kg</p>
                    </div>
                  </div>
                )}

                {fromLocation && toLocation && quantity && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900">Transfer Summary</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">From</p>
                        <p className="text-2xl font-bold text-blue-600">{fromLocation}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          {availableQty.toLocaleString()} units available
                        </p>
                      </div>

                      <ArrowRight className="mx-4 h-8 w-8 text-gray-400" />

                      <div className="flex-1 bg-green-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-green-900">To</p>
                        <p className="text-2xl font-bold text-green-600">{toLocation}</p>
                        <p className="text-sm text-green-600 mt-1">
                          +{parseInt(quantity || '0').toLocaleString()} units
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm font-medium text-yellow-900 mb-1">After Transfer:</p>
                      <div className="text-sm text-yellow-800 space-y-1">
                        <p>
                          {fromLocation}: {(availableQty - parseInt(quantity || '0')).toLocaleString()} units
                        </p>
                        <p>
                          {toLocation}: +{parseInt(quantity || '0').toLocaleString()} units
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
