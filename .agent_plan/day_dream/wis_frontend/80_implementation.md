---
project: "Warehouse Inventory System Frontend"
current_phase: 1
phase_name: "Feature Completeness"
status: WIP
last_updated: "2026-03-09"
---

# 80 - Implementation Plan

> Part of [WIS Frontend Blueprint](./00_index.md)

<!-- 
⚠️  CODE EXAMPLES & FOLDER STRUCTURES WARNING ⚠️
════════════════════════════════════════════════════════════════════════════════
Examples in this document are ILLUSTRATIVE, not PRESCRIPTIVE.

• Folder structures show INTENT, actual paths may differ
• Commands show CONCEPT, actual syntax depends on tooling
• Task descriptions are GOALS, not step-by-step instructions

The implementation agent (WarehouseArch) will determine actual file locations,
command syntax, and implementation details based on current codebase state.
════════════════════════════════════════════════════════════════════════════════
-->

---

## 📊 Status Legend

| Icon | Status | Meaning |
|------|--------|---------|
| ⏳ | `[TODO]` | Not started |
| 🔄 | `[WIP]` | In progress |
| ✅ | `[DONE]` | Complete |
| 🚧 | `[BLOCKED:reason]` | Stuck |
| 🚫 | `[CUT]` | Removed from scope |

---

## 🦴 Phase 0: Walking Skeleton — API Integration

**Goal:** *"Prove that React components can talk to Spring Boot via a typed Axios client"*

**Status:** ✅ COMPLETE

### Exit Gate

- [x] All 4 page components load data from REST API (not localStorage)
- [x] `lib/api.ts` exists with all required typed functions
- [x] `npm run dev` → app loads in browser without console errors

### Tasks

| Status | Task | Module | Difficulty |
|--------|------|--------|------------|
| ✅ | Create `lib/api.ts` with single Axios instance + `VITE_API_BASE_URL` | `lib/api.ts` | `[KNOWN]` |
| ✅ | Add `DashboardData`, `ImportResult`, `FlatInventoryItem` to `types.ts` | `types.ts` | `[KNOWN]` |
| ✅ | Implement `getDashboardData()`, wire `Dashboard.tsx` | `components/Dashboard.tsx` | `[KNOWN]` |
| ✅ | Implement `uploadProductsCsv()`, `uploadInventoryCsv()`, wire `ImportData.tsx` | `components/ImportData.tsx` | `[KNOWN]` |
| ✅ | Implement `getInventoryLevels()`, `searchInventory()`, wire `ViewInventory.tsx` | `components/ViewInventory.tsx` | `[KNOWN]` |
| ✅ | Implement `getProducts()`, `getLocations()`, `transferInventory()`, wire `TransferInventory.tsx` | `components/TransferInventory.tsx` | `[KNOWN]` |
| ✅ | Add `getApiErrorMessage()` helper for Axios error unwrapping | `lib/api.ts` | `[KNOWN]` |
| ✅ | Implement `FlatInventoryItem[] → InventoryLevel[]` transform in `api.ts` | `lib/api.ts` | `[KNOWN]` |

### P0 Completion Checklist

- [x] All 4 components use `lib/api.ts`, not `lib/storage.ts`
- [x] All API functions have explicit TypeScript return types
- [x] Loading states present in all components
- [x] try/catch error handling in all API calls
- [x] `npm run dev` works

---

## 🏗️ Phase 1: Feature Completeness

**Goal:** *"Every feature works end-to-end with a running backend — no stubs, no localStorage fallback"*

**Status:** 🔄 WIP

### Exit Gate

- [ ] `npm run build` completes with 0 TypeScript errors
- [ ] All 5 routes render correctly against a live Spring Boot instance
- [ ] Transfer form validates quantity against available stock before submitting

### Tasks

| Status | Task | Module | Difficulty |
|--------|------|--------|------------|
| ✅ | Dashboard KPI cards (totalProducts, totalLocations, totalQuantity) | `Dashboard.tsx` | `[KNOWN]` |
| ✅ | Dashboard topLocations ranked list | `Dashboard.tsx` | `[KNOWN]` |
| ✅ | Inventory search with 300ms debounce | `ViewInventory.tsx` | `[KNOWN]` |
| ✅ | Inventory grouped view (per-location row expand) | `ViewInventory.tsx` | `[KNOWN]` |
| ✅ | Transfer form with product + location selects + qty | `TransferInventory.tsx` | `[KNOWN]` |
| ✅ | Transfer available quantity display per product/location | `TransferInventory.tsx` | `[KNOWN]` |
| ✅ | Import CSV with per-section success/error banners | `ImportData.tsx` | `[KNOWN]` |
| ⏳ | Verify `tsc --noEmit` passes with 0 errors | `tsconfig.app.json` | `[KNOWN]` |
| ⏳ | Verify `npm run build` produces clean Vite bundle | `vite.config.ts` | `[KNOWN]` |
| ⏳ | End-to-end smoke test against live backend (manual) | All components | `[KNOWN]` |

### Verification (Manual)

| What to Try | Expected Result |
|-------------|-----------------|
| Navigate to `/` with backend running | Dashboard shows real counts, no errors |
| Upload valid products CSV at `/import` | "X products imported" success banner |
| Search for known product code at `/inventory` | Matching rows appear in ≤500ms |
| Transfer 1 unit A→B at `/transfer` | "Transfer successful" banner; inventory updates |
| Navigate to `/docs` | Documentation page renders |
| Kill backend, reload `/` | Error state with Retry button — no crash |

### P1 Completion Checklist

- [ ] `npm run build` succeeds
- [ ] All manual verification steps pass
- [ ] No `storage.ts` imports in any component
- [ ] No TypeScript `any` types in components or api.ts

---

## 🔮 Phase 2: UX & Reliability Polish

**Goal:** *"App handles failure gracefully and guides users through errors without developer intervention"*

**Status:** ⏳ TODO

### Tasks

| Status | Task | Module | Difficulty |
|--------|------|--------|------------|
| ⏳ | Add React Error Boundary wrapping all routes | `App.tsx` | `[KNOWN]` |
| ⏳ | Global Toast notification system for transfer success/error | `Layout.tsx` or context | `[EXPERIMENTAL]` |
| ⏳ | Transfer form: client-side qty > available guard (pre-submit) | `TransferInventory.tsx` | `[KNOWN]` |
| ⏳ | Import page: file type validation (accept `.csv` only) | `ImportData.tsx` | `[KNOWN]` |
| ⏳ | Inventory: empty state design ("No products yet — import some") | `ViewInventory.tsx` | `[KNOWN]` |
| ⏳ | Dashboard: quick-action card links to /import if 0 products | `Dashboard.tsx` | `[KNOWN]` |

### Verification (Manual)

| What to Try | Expected Result |
|-------------|-----------------|
| Upload non-CSV file | Blocked client-side with error message |
| Transfer qty > available | Blocked before API call with client error |
| Force JS error in component | Error boundary renders fallback, not blank screen |

---

## 🚀 Phase 3: Production Readiness

**Goal:** *"App is deployable with environment configuration and a minimal accessibility baseline"*

**Status:** ⏳ TODO

### Tasks

| Status | Task | Module | Difficulty |
|--------|------|--------|------------|
| ⏳ | Create `.env.example` with `VITE_API_BASE_URL` template | root | `[KNOWN]` |
| ⏳ | Document deployment steps in README.md | `README.md` | `[KNOWN]` |
| ⏳ | Add `aria-label` attributes to icon-only buttons | All components | `[KNOWN]` |
| ⏳ | Verify Lighthouse accessibility score ≥ 85 | Browser DevTools | `[EXPERIMENTAL]` |
| ⏳ | Add `<title>` tag per-route (React Helmet or meta) | `routes.ts` or components | `[KNOWN]` |

---

## ⚠️ Error Handling Philosophy

All error handling follows the **propagate-and-display** pattern:
- `lib/api.ts` functions **do not catch errors** — they propagate to components
- Components **own the try/catch** and set `error` state
- `getApiErrorMessage(err)` extracts human-readable message from Axios errors
- Users always see an error message + actionable recovery (Retry button)

### Error Types

| Error Class | When Raised | Component Recovery |
|-------------|-------------|-------------------|
| Network error (ECONNREFUSED) | Backend not running | Error banner + Retry |
| HTTP 4xx | Validation failure (bad CSV, insufficient qty) | Error banner with backend message |
| HTTP 5xx | Backend crash | Generic error message + Retry |
| Axios timeout | Slow network | Error banner + Retry |

---

**Prev:** [06 - Feature: Transfer](./06_feature_transfer.md)  
**Next:** [81 - Module Structure](./81_module_structure.md)  
**← Back to:** [Index](./00_index.md)
