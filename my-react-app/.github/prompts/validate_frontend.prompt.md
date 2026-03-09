---
description: "Run full frontend validation: TypeScript, API contracts, and component health check"
---

# Frontend Validation Check

Run a comprehensive validation of the Warehouse Inventory frontend.

## Checks to Perform

### 1. TypeScript Compilation
- Run `npx tsc --noEmit` to check for type errors
- Fix any type mismatches between frontend types and backend DTOs

### 2. API Contract Validation
Verify each API function in `lib/api.ts` matches the backend contract:

| API Function | Expected Endpoint | Expected Response Type |
|-------------|-------------------|----------------------|
| getProducts() | GET /api/products | ProductDTO[] |
| getProductByCode(code) | GET /api/products/{code} | ProductDTO |
| importProductsJson(products) | POST /api/products/import | ProductDTO[] |
| uploadProductsCsv(file) | POST /api/import/products | ImportResultDTO |
| uploadInventoryCsv(file) | POST /api/import/inventory | ImportResultDTO |
| getInventoryLevels() | GET /api/inventory | InventoryLevelDTO[] |
| searchInventory(code) | GET /api/inventory/search?code=X | InventoryLevelDTO[] |
| getLocations() | GET /api/inventory/locations | string[] |
| transferInventory(req) | POST /api/transfers | { status, message } |
| getDashboardData() | GET /api/dashboard | DashboardDTO |

### 3. Component Health
For each page component, verify:
- [ ] Proper error handling (try/catch on API calls)
- [ ] Loading states
- [ ] Empty states (no data scenario)
- [ ] TypeScript strict mode compliance
- [ ] No unused imports

### 4. Build Check
- Run `npm run build` to verify production build succeeds

---

**Default behavior**: Run all checks and report findings.
