# 05 - Feature: View Inventory

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 📖 The Story

### 😤 The Pain

```
Current Reality (before P0):
┌──────────────────────────────────────────────────┐
│  Coordinator wants to find stock for SKU-ABC     │
│       ↓                                          │
│  💥 localStorage search: client-side filter      │
│     of stale data cached from last import        │
│       ↓                                          │
│  💥 Results don't match actual warehouse         │
└──────────────────────────────────────────────────┘
```

### ✨ The Vision

```
After Feature (P1 Complete):
┌──────────────────────────────────────────────────┐
│  Coordinator wants to find stock for SKU-ABC     │
│       ↓                                          │
│  ✅ Types "ABC" in search box                    │
│       ↓                                          │
│  ✅ Debounced GET /api/inventory/search?code=ABC │
│  ✅ Returns grouped inventory by location        │
│       ↓                                          │
│  😊 Sees exactly where and how much stock is     │
└──────────────────────────────────────────────────┘
```

### 🎯 One-Liner

> The inventory page lets any user search stock by product code and see per-location quantities in real time, grouped and weighted from the live database.

### 📊 Quick Impact

| What Changes | Before | After |
|--------------|--------|-------|
| Data source | ❌ localStorage (stale) | ✅ GET /api/inventory (live) |
| Search | ❌ Client-side filter of local array | ✅ Server-side `/inventory/search?code=` |
| Grouping | ❌ Flat list | ✅ Grouped by product with location breakdown |
| Weight display | ❌ Missing | ✅ Weight from Product join |

---

## 🔧 The Spec

---

## 🎯 Intent & Scope

**Intent:** Browse all inventory levels or search by product code; display grouped per-location quantities with product weight.

**Priority:** P0  
**Difficulty:** `[KNOWN]`  
**Status:** ✅ DONE

**In Scope:**
- Load all inventory on mount via `GET /api/inventory` + `GET /api/products` (parallel)
- Debounced (300ms) search via `GET /api/inventory/search?code=`
- Transform `FlatInventoryItem[]` → `InventoryLevel[]` (grouped by productCode)
- Show: product code, name, weight, total quantity, per-location rows
- Loading state during fetch and during each search debounce
- Error state with message

**Out of Scope:**
- Pagination (deferred to P2 when product count grows)
- Sorting columns (considered P2)
- Export inventory to CSV from this view (separate from Import page)
- Real-time auto-refresh (P2 polling)

---

## ✅ Acceptance Criteria

- [ ] All inventory loads on mount from `GET /api/inventory`
- [ ] Search box triggers `GET /api/inventory/search?code=X` with 300ms debounce
- [ ] Empty search reverts to full inventory list
- [ ] Each row shows: product code, name, weight (kg), total qty, per-location chips
- [ ] Loading spinner visible during fetch
- [ ] Error banner with message on API failure
- [ ] No `storage.ts` imports
- [ ] `InventoryLevel[]` type used (no `any`)

---

## 🗺️ System Context

| Layer | File | Role |
|-------|------|------|
| Page Component | `components/ViewInventory.tsx` | Search input, table render |
| API Functions | `lib/api.ts → getInventoryLevels(), searchInventory()` | Parallel fetch + transform |
| Type | `types.ts → InventoryLevel, FlatInventoryItem` | API response + UI model |

---

## 🛠️ Technical Notes

The `FlatInventoryItem[] → InventoryLevel[]` transform happens inside `api.ts` (not the component). Backend returns flat rows (`productCode, productName, location, quantity`). The client groups them by `productCode` and injects `weight` from a parallel `/products` call.

Debounce implementation uses `useEffect` with `setTimeout` / `clearTimeout` cleanup — no extra library needed.

---

## ⚠️ Edge Cases

| Case | Handling |
|------|----------|
| Search returns 0 results | Empty array; show "No results found" |
| Product code not in products list | `weight` falls back to `0` via `weightMap.get() ?? 0` |
| Rapid typing overrides debounce | Each keystroke clears previous timer; only last fires |
| Backend returns `[]` | Empty inventory list; no error |
| Component unmounts mid-fetch | Cleanup `clearTimeout` prevents stale state update |

---

**← Back to:** [Index](./00_index.md)
