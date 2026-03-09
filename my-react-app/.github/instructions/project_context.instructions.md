---
applyTo: "**/*.{ts,tsx,css,json}"
---

# Warehouse Inventory System — Frontend Project Context

## Project Overview
This is the **React/TypeScript frontend** for the Warehouse Inventory System. It provides a web UI for managing warehouse products, inventory levels, and stock transfers across multiple warehouse locations.

The frontend communicates with a **Spring Boot REST API backend** (port 8080) via Axios HTTP client. The backend connects to a **MySQL 8.x** database.

## Tech Stack
- **React 18.3** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS 4.x** (styling)
- **React Router 7.x** (routing)
- **Axios** (HTTP client for REST API)
- **Lucide React** (icons)
- **shadcn/ui** component library

## Project Structure
```
src/
├── main.tsx                          # App entry point
├── app/
│   ├── App.tsx                       # RouterProvider setup
│   ├── routes.ts                     # React Router config
│   ├── types.ts                      # TypeScript interfaces
│   ├── components/
│   │   ├── Layout.tsx                # Nav bar + Outlet
│   │   ├── Dashboard.tsx             # / (stats overview)
│   │   ├── ImportData.tsx            # /import (CSV upload)
│   │   ├── ViewInventory.tsx         # /inventory (search & list)
│   │   ├── TransferInventory.tsx     # /transfer (move stock)
│   │   └── Documentation.tsx         # /docs (full-stack docs)
│   ├── lib/
│   │   ├── api.ts                    # Axios HTTP client (REST API)
│   │   ├── csv.ts                    # CSV parse/generate helpers
│   │   └── storage.ts               # localStorage (legacy, to be replaced)
│   └── components/ui/               # shadcn/ui components
└── styles/
    ├── fonts.css
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

## Backend API Endpoints (Spring Boot @ port 8080)
All endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List all products |
| GET | /api/products/{code} | Get product by code |
| POST | /api/products/import | Bulk upsert products (JSON) |
| POST | /api/import/products | Upload products CSV |
| POST | /api/import/inventory | Upload inventory CSV |
| GET | /api/inventory | List all inventory levels |
| GET | /api/inventory/search?code=X | Search inventory by product code |
| GET | /api/inventory/locations | List all warehouse locations |
| POST | /api/transfers | Transfer inventory between locations |
| GET | /api/dashboard | Get dashboard summary |

## Key Domain Types
```typescript
interface Product {
  id?: number;
  code: string;
  name: string;
  weight: number;
}

interface InventoryLevel {
  productCode: string;
  productName: string;
  weight: number;
  locations: { location: string; quantity: number }[];
  totalQuantity: number;
}

interface TransferRequest {
  productCode: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
}

interface DashboardData {
  totalProducts: number;
  totalLocations: number;
  totalUnits: number;
  topLocations: { location: string; quantity: number }[];
}
```

## Component-to-API Mapping
| Component | Route | API Calls |
|-----------|-------|-----------|
| Dashboard | / | GET /api/dashboard |
| ImportData | /import | POST /api/import/products, POST /api/import/inventory |
| ViewInventory | /inventory | GET /api/inventory, GET /api/inventory/search |
| TransferInventory | /transfer | POST /api/transfers, GET /api/products, GET /api/inventory/locations |

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:8080/api
```

## Core Philosophy
1. **Read Before Write**: NEVER guess component structure. Read existing code first.
2. **Reuse, Don't Reinvent**: Use existing shadcn/ui components and lib/ utilities.
3. **Consistency**: Follow existing Tailwind CSS patterns and component structure.
4. **Type Safety**: All API responses and requests must be fully typed in TypeScript.
5. **API-First**: All data operations go through `lib/api.ts`. No direct localStorage usage for production features.
