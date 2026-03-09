import { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { storage } from '../lib/storage';
import { parseProductsCSV, parseInventoryCSV, generateProductsCSV, generateInventoryCSV, downloadCSV } from '../lib/csv';

export function ImportData() {
  const [productFile, setProductFile] = useState<File | null>(null);
  const [inventoryFile, setInventoryFile] = useState<File | null>(null);
  const [productStatus, setProductStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [inventoryStatus, setInventoryStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [productMessage, setProductMessage] = useState('');
  const [inventoryMessage, setInventoryMessage] = useState('');

  const productInputRef = useRef<HTMLInputElement>(null);
  const inventoryInputRef = useRef<HTMLInputElement>(null);

  const handleProductUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProductFile(file);
    setProductStatus('idle');

    try {
      const text = await file.text();
      const products = parseProductsCSV(text);
      
      if (products.length === 0) {
        setProductStatus('error');
        setProductMessage('No valid products found in CSV');
        return;
      }

      storage.addProducts(products);
      setProductStatus('success');
      setProductMessage(`Successfully imported ${products.length} products`);
    } catch (error) {
      setProductStatus('error');
      setProductMessage('Error parsing CSV file');
    }
  };

  const handleInventoryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInventoryFile(file);
    setInventoryStatus('idle');

    try {
      const text = await file.text();
      const items = parseInventoryCSV(text);
      
      if (items.length === 0) {
        setInventoryStatus('error');
        setInventoryMessage('No valid inventory items found in CSV');
        return;
      }

      storage.addInventory(items);
      setInventoryStatus('success');
      setInventoryMessage(`Successfully imported ${items.length} inventory items`);
    } catch (error) {
      setInventoryStatus('error');
      setInventoryMessage('Error parsing CSV file');
    }
  };

  const downloadProductTemplate = () => {
    const template = `code,name,weight
PRD001,Sample Product 1,1.5
PRD002,Sample Product 2,2.0
PRD003,Sample Product 3,0.8`;
    downloadCSV(template, 'products_template.csv');
  };

  const downloadInventoryTemplate = () => {
    const template = `productCode,location,quantity
PRD001,TKO,100
PRD001,CSW,50
PRD002,KWN,200`;
    downloadCSV(template, 'inventory_template.csv');
  };

  const downloadCurrentProducts = () => {
    const products = storage.getProducts();
    const csv = generateProductsCSV(products);
    downloadCSV(csv, 'products_export.csv');
  };

  const downloadCurrentInventory = () => {
    const inventory = storage.getInventory();
    const csv = generateInventoryCSV(inventory);
    downloadCSV(csv, 'inventory_export.csv');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Import Data</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload CSV files to import products and inventory
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Upload */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Products</h2>
            <p className="mt-1 text-sm text-gray-500">
              CSV format: code, name, weight
            </p>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => productInputRef.current?.click()}
              >
                <input
                  ref={productInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleProductUpload}
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {productFile ? productFile.name : 'Click to upload CSV file'}
                </p>
              </div>

              {productStatus !== 'idle' && (
                <div
                  className={`flex items-center p-4 rounded-lg ${
                    productStatus === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {productStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-3" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-3" />
                  )}
                  <span className="text-sm">{productMessage}</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={downloadProductTemplate}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </button>
                <button
                  onClick={downloadCurrentProducts}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export Current
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Upload */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Inventory</h2>
            <p className="mt-1 text-sm text-gray-500">
              CSV format: productCode, location, quantity
            </p>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => inventoryInputRef.current?.click()}
              >
                <input
                  ref={inventoryInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleInventoryUpload}
                  className="hidden"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {inventoryFile ? inventoryFile.name : 'Click to upload CSV file'}
                </p>
              </div>

              {inventoryStatus !== 'idle' && (
                <div
                  className={`flex items-center p-4 rounded-lg ${
                    inventoryStatus === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {inventoryStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5 mr-3" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-3" />
                  )}
                  <span className="text-sm">{inventoryMessage}</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={downloadInventoryTemplate}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </button>
                <button
                  onClick={downloadCurrentInventory}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export Current
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSV Format Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-sm font-medium text-blue-900 mb-2">CSV Format Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <p className="font-medium mb-1">Products CSV:</p>
            <pre className="bg-white p-2 rounded text-xs">
{`code,name,weight
PRD001,Laptop,2.5
PRD002,Mouse,0.1`}
            </pre>
          </div>
          <div>
            <p className="font-medium mb-1">Inventory CSV:</p>
            <pre className="bg-white p-2 rounded text-xs">
{`productCode,location,quantity
PRD001,TKO,100
PRD001,CSW,50`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
