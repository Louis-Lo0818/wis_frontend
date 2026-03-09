---
description: "Migrate a frontend component from localStorage to REST API"
---

# Migrate Component to REST API

Migrate a React component from using `lib/storage.ts` (localStorage) to using `lib/api.ts` (Axios REST API client).

## Prerequisites
- The Spring Boot backend must be running on port 8080
- The `lib/api.ts` file must have the required API functions
- The component must currently be using `storage.*` calls

## Migration Steps

### 1. Identify Current Storage Usage
- Read the target component
- List all `storage.*` function calls
- Map each to the corresponding `api.*` function

### 2. Component-to-API Mapping Reference

| Component | localStorage calls | REST API calls |
|-----------|-------------------|----------------|
| Dashboard | storage.getProducts(), storage.getInventory() | getDashboardData() |
| ImportData | storage.addProducts(), storage.addInventory() | uploadProductsCsv(file), uploadInventoryCsv(file) |
| ViewInventory | storage.getProducts(), storage.getInventory() | getInventoryLevels(), searchInventory(code) |
| TransferInventory | storage.transferInventory() | transferInventory(req), getProducts(), getLocations() |

### 3. Apply Migration Pattern
For each component:
1. Replace `import { storage } from '../lib/storage'` with `import { apiFunction } from '../lib/api'`
2. Convert synchronous calls to async/await with try/catch
3. Add loading state (`useState<boolean>(true)`)
4. Add error state (`useState<string | null>(null)`)
5. Wrap data fetching in `useEffect` with cleanup
6. Show loading spinner during fetch
7. Show error message on failure

### 4. Verify
- Check TypeScript types match backend DTO shapes
- Verify error handling covers network errors and API errors
- Ensure loading states prevent interaction during fetch

---

**Default behavior**: Migrate one component at a time.
**To override**: Say "migrate all components" to batch process.
