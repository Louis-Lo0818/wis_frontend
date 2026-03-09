---
applyTo: "src/app/**/*.{ts,tsx}"
---

# React Module Development Guidelines

## Goals
- Define the boundaries and responsibilities of each module in the frontend codebase.
- Prevent anti-patterns introduced by misplacing logic across layers.
- Guide developers on where to add new code and how each module interacts.

---

## Module Map

```
src/app/
├── types.ts            ← Type contract layer (interfaces only, no logic)
├── routes.ts           ← Router config (no business logic)
├── App.tsx             ← RouterProvider mount (no logic)
│
├── lib/
│   ├── api.ts          ← Data access layer (HTTP only, no UI state)
│   └── csv.ts          ← Utility layer (CSV generation, no API calls)
│
└── components/
    ├── Layout.tsx       ← Shell (nav + Outlet)
    ├── Dashboard.tsx    ← Page component
    ├── ImportData.tsx   ← Page component
    ├── ViewInventory.tsx ← Page component
    ├── TransferInventory.tsx ← Page component
    ├── Documentation.tsx ← Page component (static)
    └── ui/             ← shadcn/ui primitives (do not modify)
```

---

## Layer Responsibilities

### `types.ts` — Type Contract Layer
**Owns:** All TypeScript interfaces shared across components and lib.  
**Rules:**
- MUST mirror backend DTO field names exactly (no renaming)
- No functions, no logic — only `interface` and `type` declarations
- When backend adds/changes a field, update here first

### `lib/api.ts` — Data Access Layer
**Owns:** All HTTP communication with the Spring Boot backend.  
**Rules:**
- ONE Axios instance: `const api = axios.create(...)`
- Every function has explicit TypeScript return type annotation
- `GET` requests → `get*` naming; `POST` → `create*`, `upload*`, `transfer*`
- Errors propagate to components — no try/catch here
- `FlatInventoryItem[] → InventoryLevel[]` transform lives here, not in components
- `getApiErrorMessage(err)` is the single Axios error unwrapping utility

### `lib/csv.ts` — Utility Layer
**Owns:** Client-side CSV string construction and browser download trigger.  
**Rules:**
- No API calls — CSV generation is fully client-side
- No state management

### `components/*.tsx` — Page Components
**Owns:** UI rendering, user interaction, local React state.  
**Rules:**
- Functional components only (`function Foo()` or `const Foo = () => {}`)
- State pattern for all data-fetching components:
  ```typescript
  const [data, setData] = useState<Type | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  ```
- All API calls inside `useEffect` with try/catch
- Target ≤200 lines; MUST split if exceeding 300 lines
- Import order: React → third-party → local components → `lib/api` → types

### `components/ui/` — Primitive Layer
**Owns:** shadcn/ui primitive components (Button, Card, Input, etc.)  
**Rules:**
- NEVER modify these files directly (managed by shadcn/ui CLI)
- Always check this folder before building a custom UI element

---

## Adding a New Page

1. Create `src/app/components/<PageName>.tsx`
2. Export a named functional component: `export function PageName() {}`
3. Add required types to `types.ts` (if new backend DTOs involved)
4. Add required API function to `lib/api.ts` (if new endpoints needed)
5. Register route in `routes.ts` under the Layout children
6. Add nav link in `Layout.tsx` if user-accessible

---

## Anti-Pattern Reference

| ❌ Anti-Pattern | ✅ Correct Pattern |
|----------------|-------------------|
| `import { storage } from '../lib/storage'` in a component | `import { getXxx } from '../lib/api'` |
| `axios.create()` inside a component | Use exported `api` instance from `lib/api.ts` |
| Inline `fetch()` call in a component | Use typed function from `lib/api.ts` |
| `any` typed API response | Define interface in `types.ts`, use it |
| `style={{ color: 'red' }}` inline | Tailwind: `className="text-red-600"` |
| Custom button/card built from scratch | Use `components/ui/button`, `components/ui/card` |
| Data fetching without loading state | Always `setLoading(true/false)` around API calls |
| API call without try/catch in component | Always wrap in try/catch, `setError(...)` on failure |
