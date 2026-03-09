# 81 - Module Structure

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 📖 The Story

### 😤 The Pain → ✨ The Vision

```
┌──────────────────────────────────┬──────────────────────────────────┐
│  BEFORE                          │  AFTER                           │
├──────────────────────────────────┼──────────────────────────────────┤
│  Developer opens codebase        │  Developer opens codebase        │
│       ↓                          │       ↓                          │
│  💥 Business logic in components │  ✅ API calls isolated in lib/   │
│  💥 Types scattered or missing   │  ✅ All types in types.ts        │
│  💥 Unclear where to add feature │  ✅ Clear module boundaries       │
└──────────────────────────────────┴──────────────────────────────────┘
```

### 🎯 One-Liner

> Three clean layers: Route Components (UI + state), Lib (business logic, API, CSV), and UI primitives (shadcn/ui + Tailwind) — each with a single clear responsibility.

---

## 🔧 The Spec

---

## 🏗️ Module Organization

### 📦 Reusable Modules

| Module | Path | Purpose | Reuse Potential |
|--------|------|---------|------------------|
| API Client | `src/app/lib/api.ts` | Typed Axios wrapper for all REST calls | Any frontend project targeting this Spring Boot API |
| CSV Helpers | `src/app/lib/csv.ts` | Client-side CSV generation & download | Any app needing CSV export without a server |
| Shared Types | `src/app/types.ts` | TypeScript interfaces matching backend DTOs | Any frontend project consuming the same Spring Boot API |
| shadcn/ui Components | `src/app/components/ui/` | Pre-built accessible UI primitives | Universal across all React projects using shadcn |

### 🎯 Project-Specific Modules

| Module | Path | Purpose |
|--------|------|---------|
| App Entry | `src/main.tsx` | React 18 `createRoot` mount point |
| Router Config | `src/app/App.tsx` + `routes.ts` | `RouterProvider` + `createBrowserRouter` config |
| Layout Shell | `src/app/components/Layout.tsx` | Top navigation bar + `<Outlet />` for child routes |
| Dashboard Page | `src/app/components/Dashboard.tsx` | KPI cards + top locations table |
| Import Data Page | `src/app/components/ImportData.tsx` | CSV file upload sections for products + inventory |
| View Inventory Page | `src/app/components/ViewInventory.tsx` | Search input + inventory grouped table |
| Transfer Inventory Page | `src/app/components/TransferInventory.tsx` | Transfer form with live validation |
| Documentation Page | `src/app/components/Documentation.tsx` | Static API reference and usage guide |
| Global Styles | `src/styles/` | Tailwind base + theme tokens + fonts |

---

## 📂 File Tree (Current State)

```text
src/
├── main.tsx                          ← React 18 createRoot entry
└── app/
    ├── App.tsx                       ← RouterProvider wrapper
    ├── routes.ts                     ← createBrowserRouter definition
    ├── types.ts                      ← All shared TypeScript interfaces
    │
    ├── components/
    │   ├── Layout.tsx                ← Nav shell + <Outlet />
    │   ├── Dashboard.tsx             ← / route
    │   ├── ImportData.tsx            ← /import route
    │   ├── ViewInventory.tsx         ← /inventory route
    │   ├── TransferInventory.tsx     ← /transfer route
    │   ├── Documentation.tsx         ← /docs route
    │   └── ui/                       ← shadcn/ui primitives (Button, Card, etc.)
    │
    └── lib/
        ├── api.ts                    ← Axios instance + all API functions
        └── csv.ts                    ← downloadCSV() helper

src/styles/
    ├── index.css                     ← Global reset + font imports
    ├── tailwind.css                  ← @tailwind directives
    ├── theme.css                     ← CSS custom properties (colors, radii)
    └── fonts.css                     ← Font-face declarations
```

---

## 🔑 Module Responsibilities

### `lib/api.ts` — API Client

**Owns:** All HTTP communication  
**Does NOT own:** UI state, error display, routing

Key exports:
```typescript
// Single instance
const api = axios.create({ baseURL: VITE_API_BASE_URL })

// Functions (grouped by resource)
getProducts()           → Product[]
getInventoryLevels()    → InventoryLevel[]    // includes transform
searchInventory(code)   → InventoryLevel[]    // includes transform
getLocations()          → string[]
transferInventory(req)  → { status, message }
uploadProductsCsv(file) → ImportResult
uploadInventoryCsv(file)→ ImportResult
getDashboardData()      → DashboardData
getApiErrorMessage(err) → string              // utility
```

### `types.ts` — Type Contract

**Owns:** All shared TypeScript interfaces  
**Rule:** Must mirror backend DTO shapes exactly (no frontend-only augmentation)

Key types: `Product`, `InventoryItem`, `InventoryLevel`, `FlatInventoryItem`, `TransferRequest`, `DashboardData`, `ImportResult`

### `components/*.tsx` — Page Components

**Owns:** UI rendering, user interaction, local state  
**Does NOT own:** HTTP calls (delegated to `lib/api.ts`), business rules (delegated to backend)

Pattern for every component:
```typescript
const [data, setData] = useState<Type | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
// useEffect → api.ts call → setData / setError / setLoading
```

### `lib/csv.ts` — CSV Utilities

**Owns:** Client-side CSV string generation and browser download trigger  
**Does NOT own:** CSV parsing (handled by backend), file upload (handled by `api.ts`)

---

## 🚫 Anti-Patterns to Avoid

| ❌ Don't | ✅ Do Instead |
|----------|---------------|
| Import `storage.ts` in components | Use `lib/api.ts` functions |
| Create new `axios.create()` in components | Use the shared instance from `lib/api.ts` |
| Put async data fetching logic in component body (no useEffect) | Always use `useEffect` for side effects |
| Use `any` for API response types | Define interfaces in `types.ts` |
| Add inline styles | Use Tailwind utility classes |
| Build custom UI primitives for buttons/inputs | Use `components/ui/` shadcn components |

---

**Prev:** [80 - Implementation](./80_implementation.md)  
**Next:** [99 - References](./99_references.md)  
**← Back to:** [Index](./00_index.md)
