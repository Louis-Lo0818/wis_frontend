---
description: "Create a new page component with API integration for the Warehouse Inventory frontend"
---

# Create New Page Component

Create a new page component that follows the Warehouse Inventory frontend patterns.

## Steps

### 1. Define the Component
- Determine the page name, route path, and which API endpoints it uses
- Check `types.ts` for existing types or define new ones
- Check `lib/api.ts` for existing API functions or add new ones

### 2. Create Component File
Create in `src/app/components/` following this pattern:

```tsx
import { useState, useEffect } from 'react';
import { apiFunction } from '../lib/api';
import type { SomeType } from '../types';

export function NewPage() {
  const [data, setData] = useState<SomeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await apiFunction();
        setData(result);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Page Title</h1>
      {/* Content */}
    </div>
  );
}
```

### 3. Add Route
Add the new route to `src/app/routes.ts`

### 4. Add Navigation
Add a navigation link in `Layout.tsx`

### 5. Verify
- TypeScript compiles without errors
- API calls work against the backend
- Loading and error states display correctly
- Responsive layout works on mobile

---

**Default behavior**: Create a single page component with API integration.
