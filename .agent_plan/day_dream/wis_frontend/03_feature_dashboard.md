# 03 - Feature: Dashboard

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 📖 The Story

### 😤 The Pain → ✨ The Vision

```
┌──────────────────────────────────┬──────────────────────────────────┐
│  BEFORE                          │  AFTER                           │
├──────────────────────────────────┼──────────────────────────────────┤
│  Manager opens app               │  Manager opens app               │
│       ↓                          │       ↓                          │
│  💥 Sees stale localStorage data │  ✅ Sees live KPI cards from API  │
│       ↓                          │       ↓                          │
│  💥 Numbers wrong after import   │  ✅ Top locations ranked by qty  │
│       ↓                          │       ↓                          │
│  😤 Can't trust the dashboard    │  😊 Source of truth at a glance  │
└──────────────────────────────────┴──────────────────────────────────┘
```

### 🎯 One-Liner

> The dashboard gives warehouse staff an at-a-glance health check — total products, active locations, total units, and top-performing locations — all pulled live from the backend.

### 📊 Quick Impact

| What Changes | Before | After |
|--------------|--------|-------|
| Data source | ❌ localStorage (stale) | ✅ GET /api/dashboard (live) |
| Refresh behavior | ❌ Lost on browser refresh | ✅ Re-fetches on mount/retry |
| Loading states | ❌ None | ✅ Skeleton placeholders |
| Error recovery | ❌ Silent failure | ✅ Inline error + Retry button |

---

## 🔧 The Spec

---

## 🎯 Intent & Scope

**Intent:** Render live KPI metrics from `/api/dashboard` with loading/error/retry UX.

**Priority:** P0  
**Difficulty:** `[KNOWN]`  
**Status:** ✅ DONE

**In Scope:**
- GET `/api/dashboard` on component mount
- Display: Total Products, Active Locations, Total Units (KPI cards)
- Display: Top Locations ranked table
- Loading skeleton during fetch
- Error message + Retry button on failure
- Quick-access links to /inventory and /transfer pages

**Out of Scope:**
- Auto-refresh / polling (deferred to P2)
- Per-location drill-down (separate feature)
- Historical trend charts (not in MVP)

---

## ✅ Acceptance Criteria

- [ ] Dashboard loads data from `GET /api/dashboard` (not localStorage)
- [ ] Three KPI cards display: `totalProducts`, `totalLocations`, `totalQuantity`
- [ ] `topLocations` array rendered as ranked list/table
- [ ] Skeleton placeholders visible while loading
- [ ] Error state with message + clickable Retry button
- [ ] Retry re-triggers API call without page reload
- [ ] TypeScript type is `DashboardData` (no `any`)
- [ ] `storage.ts` is NOT imported

---

## 🗺️ System Context

| Layer | File | Role |
|-------|------|------|
| Page Component | `components/Dashboard.tsx` | UI, state management |
| API Function | `lib/api.ts → getDashboardData()` | HTTP GET /dashboard |
| Type | `types.ts → DashboardData` | Response shape contract |

---

## 🛠️ Technical Notes

`DashboardData` shape (from `types.ts`):
```typescript
interface DashboardData {
  totalProducts: number;
  totalLocations: number;
  totalQuantity: number;
  topLocations: { location: string; quantity: number }[];
}
```

The backend field is `totalQuantity` (not `totalUnits`). The `?? 0` null-coalesce guards against backend returning `null` for empty warehouses.

---

## ⚠️ Edge Cases

| Case | Handling |
|------|----------|
| Empty warehouse (all counts = 0) | `?? 0` coalesce; renders 0, not blank |
| Backend returns `topLocations: null` | Guard with `data.topLocations ?? []` |
| Network timeout | Axios rejects; catch block shows error message |
| Backend down (ECONNREFUSED) | Error state + Retry; no app crash |

---

**← Back to:** [Index](./00_index.md)
