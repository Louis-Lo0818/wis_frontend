# 06 - Feature: Transfer Inventory

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 📖 The Story

### 😤 The Pain

```
Current Reality (before P0):
┌──────────────────────────────────────────────────┐
│  Operator wants to move 50 units from A → B     │
│       ↓                                          │
│  💥 localStorage.transferInventory()             │
│     mutates in-browser array — nothing persists  │
│       ↓                                          │
│  💥 Refresh = transfer never happened            │
└──────────────────────────────────────────────────┘
```

### ✨ The Vision

```
After Feature (P1 Complete):
┌──────────────────────────────────────────────────┐
│  Operator wants to move 50 units from A → B     │
│       ↓                                          │
│  ✅ Selects product, from, to, qty in form       │
│       ↓                                          │
│  ✅ POST /api/transfers → DB transaction         │
│       ↓                                          │
│  😊 "Transfer successful" — persisted in MySQL   │
└──────────────────────────────────────────────────┘
```

### 🎯 One-Liner

> The transfer page lets operators move stock between warehouse locations with server-validated quantities and immediate feedback.

### 📊 Quick Impact

| What Changes | Before | After |
|--------------|--------|-------|
| Persistence | ❌ In-memory only | ✅ MySQL via POST /api/transfers |
| Validation | ❌ None | ✅ Server + client-side: qty > available |
| Location source | ❌ Hardcoded | ✅ GET /api/inventory/locations |
| Product source | ❌ localStorage | ✅ GET /api/products (live) |

---

## 🔧 The Spec

---

## 🎯 Intent & Scope

**Intent:** Provide a form to move a specified quantity of a product between two warehouse locations via the REST API.

**Priority:** P0  
**Difficulty:** `[KNOWN]`  
**Status:** ✅ DONE

**In Scope:**
- Load products + locations + inventory in parallel on mount
- Form fields: product code (select), from location (select), to location (select), quantity (number)
- Client validation: all fields required; from ≠ to; quantity > 0
- Quantity available display per product/location combination
- `POST /api/transfers` on submit
- Success banner with backend message
- Error banner with API error message

**Out of Scope:**
- Bulk transfer (multiple products in one transaction)
- Transfer history / audit log view (backend concern)
- Undo/reverse transfer feature

---

## ✅ Acceptance Criteria

- [ ] Product dropdown populated from `GET /api/products`
- [ ] From/To location dropdowns populated from `GET /api/inventory/locations`
- [ ] Available quantity shown for selected product + from-location combination
- [ ] Submit blocked if from === to
- [ ] Submit blocked if quantity exceeds available stock
- [ ] `POST /api/transfers` called with `TransferRequest` body
- [ ] Success state shows backend `message` field
- [ ] Error state shows `getApiErrorMessage()` result
- [ ] Form resets to idle after successful transfer
- [ ] No `storage.ts` imports

---

## 🗺️ System Context

| Layer | File | Role |
|-------|------|------|
| Page Component | `components/TransferInventory.tsx` | Form, validation, status display |
| API Functions | `lib/api.ts → getProducts(), getLocations(), getInventoryLevels(), transferInventory()` | Parallel load + POST |
| Type | `types.ts → TransferRequest, Product, InventoryLevel` | Request/response shapes |

---

## 🛠️ Technical Notes

`TransferRequest` shape:
```typescript
interface TransferRequest {
  productCode: string;
  fromLocation: string;
  toLocation: string;
  quantity: number;
}
```

Parallel data load on mount:
```typescript
const [products, locations, inventory] = await Promise.all([
  getProducts(), getLocations(), getInventoryLevels()
]);
```

Available quantity for a product/location: cross-reference `inventory` state to find `InventoryLevel.locations[x].quantity` matching the selected code + fromLocation.

---

## ⚠️ Edge Cases

| Case | Handling |
|------|----------|
| from === to | Client validation blocks submit; error message |
| Qty > available stock | Client validation (or backend 400); error shown |
| Product has no stock at from-location | Available = 0; user blocked from submitting |
| Backend insufficient stock error | Backend 4xx → `getApiErrorMessage()` shows detail |
| Transfer during concurrent edit | Backend transaction wins; frontend shows server message |
| Empty products list | Dropdown empty; submit disabled |

---

**← Back to:** [Index](./00_index.md)
