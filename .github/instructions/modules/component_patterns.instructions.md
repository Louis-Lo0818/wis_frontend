---
applyTo: "src/app/components/*.tsx"
---

# React Component Development Guidelines (Extended)

> This file extends `react_components.instructions.md` (root-level) with deeper patterns.
> The root file defines the base rules. This file adds implementation-level detail.

---

## Component Lifecycle Pattern

Every page component that fetches data MUST follow this exact lifecycle:

```typescript
export function MyPage() {
  // 1. State declarations (data → loading → error order)
  const [data, setData] = useState<MyType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Load function (async, reusable for retry)
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      setData(await getMyData());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  // 3. Mount trigger
  useEffect(() => {
    loadData();
  }, []);

  // 4. Render: loading → error → data (always in this order)
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorBanner message={error} onRetry={loadData} />;
  if (!data) return null;

  return <>{/* actual UI */}</>;
}
```

---

## Loading State Pattern

Use Tailwind skeleton elements for loading states:

```tsx
// Card skeleton
<div className="bg-gray-200 animate-pulse h-24 rounded-lg" />

// Table row skeleton
<div className="bg-gray-100 animate-pulse h-8 rounded mb-2" />
```

NEVER show stale data from a previous fetch. Always reset to loading state when re-fetching.

---

## Error State Pattern

Every error state MUST include:
1. The error message
2. A **Retry** button that re-calls the load function

```tsx
<div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
  <p className="text-red-800 mb-4">{error}</p>
  <button
    onClick={loadData}
    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
  >
    Retry
  </button>
</div>
```

---

## Form Submit Pattern

For forms that POST to the API (TransferInventory, ImportData):

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('idle');

  // Client-side validation first
  if (!field) {
    setStatus('error');
    setMessage('Please fill in all fields');
    return;
  }

  try {
    const result = await apiFunction(payload);
    setStatus('success');
    setMessage(result.message ?? 'Operation successful');
  } catch (err: unknown) {
    setStatus('error');
    setMessage(err instanceof Error ? err.message : 'Operation failed');
  }
};
```

---

## Debounced Search Pattern

For ViewInventory-style search with debounce:

```typescript
useEffect(() => {
  const timer = setTimeout(async () => {
    try {
      setLoading(true);
      const result = query ? await searchFn(query) : await loadAllFn();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  }, 300); // 300ms debounce

  return () => clearTimeout(timer); // cleanup on next keystroke
}, [query]);
```

---

## Empty State Pattern

Always handle the case where the API returns an empty array:

```tsx
{data.length === 0 ? (
  <div className="text-center py-12 text-gray-500">
    <p>No items found.</p>
    <p className="text-sm mt-1">Try adjusting your search or import some data.</p>
  </div>
) : (
  <>{/* item list */}</>
)}
```

---

## Parallel Data Loading

When a component needs multiple independent API calls on mount, use `Promise.all`:

```typescript
const [products, locations, inventory] = await Promise.all([
  getProducts(),
  getLocations(),
  getInventoryLevels(),
]);
```

This halves the wait time vs sequential `await` calls.
