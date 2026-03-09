# 04 - Feature: Import Data

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 📖 The Story

### 😤 The Pain → ✨ The Vision

```
┌──────────────────────────────────┬──────────────────────────────────┐
│  BEFORE                          │  AFTER                           │
├──────────────────────────────────┼──────────────────────────────────┤
│  Admin has bulk product data     │  Admin has bulk product data     │
│       ↓                          │       ↓                          │
│  💥 Pastes into localStorage ops │  ✅ Uploads CSV file to UI       │
│       ↓                          │       ↓                          │
│  💥 Data lost on refresh         │  ✅ POST /api/import/* persists  │
│       ↓                          │       ↓                          │
│  😤 Entire import wasted         │  😊 "127 products imported"      │
└──────────────────────────────────┴──────────────────────────────────┘
```

### 🎯 One-Liner

> The Import page accepts products and inventory CSV files and streams them to the Spring Boot backend for persistent database upsert.

### 📊 Quick Impact

| What Changes | Before | After |
|--------------|--------|-------|
| Data persistence | ❌ localStorage only | ✅ MySQL via Spring Boot |
| Upload feedback | ❌ None | ✅ Count + skip/error summary |
| File type | ❌ In-memory only | ✅ multipart/form-data upload |

---

## 🔧 The Spec

---

## 🎯 Intent & Scope

**Intent:** Upload products CSV and inventory CSV to backend endpoints and display import results.

**Priority:** P0  
**Difficulty:** `[KNOWN]`  
**Status:** ✅ DONE

**In Scope:**
- Products CSV upload → POST `/api/import/products`
- Inventory CSV upload → POST `/api/import/inventory`
- Display `importedCount`, `skippedCount`, `errors[]` from `ImportResult`
- Success / error status badge per upload section
- CSV template download buttons (via `lib/csv.ts`)

**Out of Scope:**
- CSV validation/preview before upload (P2 consideration)
- Drag-and-drop file upload (enhancement, not MVP)
- Upload progress bar (multipart; backend streams synchronously)
- Undo/rollback last import (backend concern)

---

## ✅ Acceptance Criteria

- [ ] Products CSV upload calls `POST /api/import/products` with `multipart/form-data`
- [ ] Inventory CSV upload calls `POST /api/import/inventory` with `multipart/form-data`
- [ ] Success message shows `importedCount` (and `skippedCount` if > 0)
- [ ] Error message shows `errors[]` joined or at least first error
- [ ] `ImportResult.success === false` triggers error UI (not success)
- [ ] File input resets properly after upload
- [ ] CSV template downloads work without API call (client-side generation)
- [ ] No `storage.ts` imports

---

## 🗺️ System Context

| Layer | File | Role |
|-------|------|------|
| Page Component | `components/ImportData.tsx` | File input, status display |
| API Functions | `lib/api.ts → uploadProductsCsv(), uploadInventoryCsv()` | FormData multipart POST |
| CSV Helper | `lib/csv.ts → downloadCSV()` | Template CSV client generation |
| Type | `types.ts → ImportResult` | Response shape |

---

## 🛠️ Technical Notes

`ImportResult` shape:
```typescript
interface ImportResult {
  success: boolean;
  importedCount: number;
  skippedCount: number;
  errors: string[];
}
```

File upload pattern in `api.ts`:
```typescript
const form = new FormData();
form.append('file', file);
api.post('/import/products', form, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

The `Content-Type` override is required — Axios does not auto-set the multipart boundary when you override headers. The `multipart/form-data` string intentionally lacks the boundary; Axios rewrites it.

---

## ⚠️ Edge Cases

| Case | Handling |
|------|----------|
| Wrong file type (not CSV) | Backend rejects; `ImportResult.success = false` with error |
| Empty CSV file | Backend returns `importedCount: 0`; UI shows "0 imported" |
| CSV with some invalid rows | `skippedCount > 0`; partial success shown |
| Network error during upload | Axios rejects; catch block shows error message |
| File > server max size | Backend 413; caught in error block |

---

**← Back to:** [Index](./00_index.md)
