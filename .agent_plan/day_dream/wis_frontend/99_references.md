# 99 - References

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 🌐 APIs & Data Sources

| Source | Endpoint | Purpose |
|--------|----------|---------|
| Spring Boot Backend | `http://localhost:8080/api` | All warehouse data operations |
| Dashboard API | `GET /api/dashboard` | KPI summary (products, locations, units, top locations) |
| Inventory API | `GET /api/inventory` | All flat inventory rows |
| Inventory Search API | `GET /api/inventory/search?code=X` | Server-side product code search |
| Locations API | `GET /api/inventory/locations` | Available warehouse location list |
| Products API | `GET /api/products` | All products with weight |
| Single Product API | `GET /api/products/{code}` | Product by code (available, not yet used in UI) |
| Transfers API | `POST /api/transfers` | Stock movement between locations |
| Import Products API | `POST /api/import/products` | CSV bulk upsert for products |
| Import Inventory API | `POST /api/import/inventory` | CSV bulk upsert for inventory |

---

## 🛠️ Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI component model |
| TypeScript | 5.x | Type safety throughout |
| Vite | 6.x | Build tool + dev server |
| React Router | 7.x | SPA navigation, `createBrowserRouter` |
| Axios | 1.x | HTTP client with typed responses |
| Tailwind CSS | 4.x | Utility-first styling |
| shadcn/ui | latest | Accessible UI component primitives |
| Lucide React | latest | Icon set (Package, MapPin, ArrowRight, etc.) |

---

## 📦 Libraries & Dependencies

| Library | Purpose | Notes |
|---------|---------|-------|
| `axios` | REST API HTTP client | Single instance in `lib/api.ts` |
| `react-router` | Client-side routing | `createBrowserRouter` + `RouterProvider` |
| `lucide-react` | SVG icon components | Used in all page headers and stat cards |
| `tailwindcss` | CSS utility framework | v4.x — PostCSS-based, no config file |
| `@radix-ui/*` | Headless UI primitives | Underlying layer for shadcn/ui |
| `postcss` | CSS processing | Required by Tailwind v4 |

---

## 📖 Documentation

| Topic | URL | Notes |
|-------|-----|-------|
| Axios Docs | https://axios-http.com/docs/intro | API function patterns, interceptors |
| React Router v7 | https://reactrouter.com/home | `createBrowserRouter`, `<Outlet />` |
| Tailwind CSS v4 | https://tailwindcss.com/docs | v4 CSS-first config syntax |
| shadcn/ui | https://ui.shadcn.com/ | Component catalogue, installation |
| Lucide Icons | https://lucide.dev/ | Icon search |
| Vite Env Variables | https://vitejs.dev/guide/env-and-mode | `VITE_API_BASE_URL` config |

---

## 🔗 Related Projects

| Project | Relationship |
|---------|--------------|
| Warehouse Inventory System (Spring Boot) | Backend API provider; MySQL 8.x database |
| Warehouse Inventory System (`target_project/`) | Reference implementation in workspace |

---

## 📚 Additional Reading

| Topic | Notes |
|-------|-------|
| HyperDream Blueprint Templates | `data/.agent_plan/day_dream/templates/` — format reference for this blueprint |
| Agent Team Instructions | `.github/agents/` — WarehouseArch, WarehouseOrch, etc. |
| Component Guidelines | `.github/instructions/react_components.instructions.md` |
| API Client Guidelines | `.github/instructions/api_client.instructions.md` |
| Project Context | `.github/instructions/project_context.instructions.md` |

---

**Prev:** [81 - Module Structure](./81_module_structure.md)  
**← Back to:** [Index](./00_index.md)
