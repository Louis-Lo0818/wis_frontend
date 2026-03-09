---
applyTo: "src/app/lib/api.ts"
---

# API Client Guidelines

## Goals
- Maintain a single, typed API client for all backend communication
- Ensure consistent error handling and request patterns
- Keep API functions aligned with Spring Boot backend contracts

## Rules

1. **Single Axios Instance**: Use the shared `api` instance created with `axios.create()`. Never create new instances.

2. **Base URL**: Always use `VITE_API_BASE_URL` env variable. Default fallback: `http://localhost:8080/api`.

3. **Type Safety**: Every API function must have explicit return type annotations matching backend DTOs.

4. **Function Naming Convention**:
   - GET requests: `get*` (e.g., `getProducts`, `getInventoryLevels`)
   - POST requests: `create*`, `upload*`, `import*`, `transfer*`
   - PUT requests: `update*`
   - DELETE requests: `delete*`

5. **File Uploads**: Use `FormData` with `Content-Type: multipart/form-data` header override.

6. **No Error Handling Here**: Let errors propagate to components. Components handle UI error display.

7. **API Endpoint Reference**:
   | Function | Method | Endpoint |
   |----------|--------|----------|
   | getProducts | GET | /products |
   | getProductByCode | GET | /products/{code} |
   | importProductsJson | POST | /products/import |
   | uploadProductsCsv | POST | /import/products |
   | uploadInventoryCsv | POST | /import/inventory |
   | getInventoryLevels | GET | /inventory |
   | searchInventory | GET | /inventory/search?code=X |
   | getLocations | GET | /inventory/locations |
   | transferInventory | POST | /transfers |
   | getDashboardData | GET | /dashboard |
