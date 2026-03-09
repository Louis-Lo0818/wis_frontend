# 01 - Executive Summary

> Part of [WIS Frontend Blueprint](./00_index.md)

---

## 📖 The Story

### 😤 The Pain

```
Current Reality (before P0):
┌──────────────────────────────────────────────────┐
│  Manager wants to check stock at Location A      │
│       ↓                                          │
│  💥 Opens spreadsheet → data is stale/missing    │
│       ↓                                          │
│  💥 Or frontend stores data in localStorage      │
│     → refreshing browser LOSES all inventory!    │
│       ↓                                          │
│  😤 Back to spreadsheet. Every. Single. Time.    │
└──────────────────────────────────────────────────┘
```

| Who Hurts | Pain Level | Frequency |
|-----------|------------|-----------|
| Warehouse Manager | 🔥🔥🔥 High | Daily |
| Logistics Coordinator | 🔥🔥🔥 High | Multiple/day |
| Supply Chain Analyst | 🔥🔥 Medium | Weekly |

### ✨ The Vision

```
After WIS Frontend (P1 Complete):
┌──────────────────────────────────────────────────┐
│  Manager wants to check stock at Location A      │
│       ↓                                          │
│  ✅ Opens browser → /inventory → types code      │
│       ↓                                          │
│  ✅ Real-time data from Spring Boot API          │
│       ↓                                          │
│  😊 Transfers stock, imports CSV, syncs DB       │
└──────────────────────────────────────────────────┘
```

### 🎯 One-Liner

> A React SPA that replaces spreadsheet chaos with a real-time, API-backed warehouse inventory management UI.

---

## 🔧 The Spec

---

## 🌟 TL;DR

The WIS Frontend is a React 18 + TypeScript SPA backed by a Spring Boot REST API at port 8080. It provides four core workflows: dashboard KPI overview, CSV bulk import, inventory search/browse, and inter-location stock transfer. Phase 0 (API integration) is complete — all data flows through `lib/api.ts` via Axios.

---

## 🎯 Problem Statement

The original prototype stored all warehouse data in browser `localStorage` via `storage.ts`. This meant data was lost on browser refresh, not shared across browsers/users, and impossible to integrate with a real backend. The Spring Boot backend + MySQL database are production-ready but needed a properly wired frontend. Additionally, all four page components needed async patterns (loading states, error handling) appropriate for real API calls.

---

## 🔍 Prior Art & Existing Solutions

| Library/Tool | What It Does | Decision | License | Rationale |
|--------------|--------------|----------|---------|-----------|
| Axios | HTTP client | BUY | MIT | Already in project; typed, interceptor support |
| React Query / TanStack Query | Server state cache | SKIP (P2) | MIT | Overkill for current scale; useState+useEffect sufficient |
| SWR | Data fetching | SKIP | MIT | Overlap with Axios pattern already established |
| shadcn/ui | Component library | BUY | MIT | Already installed; consistent design system |
| React Router 7.x | SPA routing | BUY | MIT | Already installed; file-route aligned |
| Tailwind CSS 4.x | Styling | BUY | MIT | Already in project; utility-first aligns with team style |

**Summary:** No new dependencies needed for P0/P1. All required tooling was already present — the gap was wiring components to the existing API layer.

---

## ❌ Non-Goals (Explicit Exclusions)

| Non-Goal | Rationale |
|----------|-----------|
| Backend development or DB schema changes | This project is frontend-only; backend is Spring Boot (separate repo) |
| User authentication / role-based access | Not in MVP scope; backend has no auth endpoints yet |
| Offline/PWA support | Adds complexity without business demand; localStorage already cut |
| Real-time WebSocket updates (live dashboard) | REST polling sufficient for warehouse update cadence |
| Multi-language / i18n | English-only MVP; internationalization deferred indefinitely |
| Mobile-native app | Web-first; responsive Tailwind layout covers mobile browsers |

---

## ✅ Features Overview

| # | Feature | Priority | Difficulty | Status |
|---|---------|----------|------------|--------|
| F1 | Dashboard KPI Overview | P0 | `[KNOWN]` | ✅ DONE |
| F2 | Bulk CSV Import | P0 | `[KNOWN]` | ✅ DONE |
| F3 | Inventory Search & Browse | P0 | `[KNOWN]` | ✅ DONE |
| F4 | Inter-Location Transfer | P0 | `[KNOWN]` | ✅ DONE |
| F5 | Error Boundary + Global Toast | P1 | `[KNOWN]` | ⏳ TODO |
| F6 | Env-Aware Config & Deployment | P2 | `[KNOWN]` | ⏳ TODO |

---

## 🎯 Success Metrics

| Metric | Threshold | Current |
|--------|-----------|---------|
| All 4 pages load data from API | 100% pages | ✅ 100% |
| Zero localStorage reads for production data | 0 storage.ts imports in components | ✅ 0 |
| TypeScript compile with 0 errors | `tsc --noEmit` passes | 🔄 Verify |
| API error shown to user (not swallowed) | 100% API calls have try/catch | ✅ 100% |
| `npm run build` succeeds | Clean Vite build | 🔄 Verify |

---

**Next:** [02 - Architecture](./02_architecture.md)  
**← Back to:** [Index](./00_index.md)
