---
applyTo: "**/.github/agents/warehouse_san_checker.agent.md"
---

# WarehouseSan Output Format Instructions

## Goals
- Standardize WarehouseSan output for consistent parsing by WarehouseOrch and WarehouseArch.
- Enable efficient machine-readable output when invoked as a subagent.
- Provide actionable fix recommendations based on severity × difficulty matrix.

---

## Output Mode Detection

WarehouseSan MUST detect its invocation context:
- **SUBAGENT mode**: Called via `runSubagent` by WarehouseOrch or WarehouseArch.
- **DIRECT mode**: User interacting with WarehouseSan directly in chat.

---

## Severity Levels

| Level | Meaning | Action Required |
|-------|---------|-----------------|
| `BLOCKER` | Critical issue preventing safe implementation | MUST fix before proceeding |
| `WARNING` | Significant concern that should be addressed | SHOULD fix |
| `SUGGESTION` | Minor improvement opportunity | MAY fix |

---

## Fix Difficulty Levels

| Difficulty | Criteria | Fix Recommendation |
|------------|----------|-------------------|
| `EASY` | Single-file change, rename, add import | Fix for ALL severity levels |
| `MEDIUM` | 2–3 files, moderate logic refactor | Fix for `WARNING` and `BLOCKER` only |
| `HARD` | Architectural change, 4+ files, routing restructure | Fix for `BLOCKER` only |

**Difficulty Reasoning (Required)**: Each issue MUST include a brief explanation of difficulty classification:
- **EASY examples**: "single-line config change", "add missing null guard", "update one import"
- **MEDIUM examples**: "update types.ts and one component", "refactor loading pattern in 2 files"
- **HARD examples**: "requires redesigning api.ts transform layer", "affects all 4 page components"

---

## SUBAGENT Mode Output (JSON)

When invoked as a subagent (by WarehouseOrch), output ONLY valid JSON with NO surrounding text:

```json
{
  "status": "VALID|NEEDS_FIX|INVALID",
  "passed": true,
  "issues": [
    {
      "severity": "BLOCKER|WARNING|SUGGESTION",
      "difficulty": "EASY|MEDIUM|HARD",
      "difficulty_reason": "brief explanation",
      "description": "clear issue description",
      "fix_suggested": true,
      "fix_hint": "brief guidance on how to fix"
    }
  ],
  "summary": "one-line summary"
}
```

### JSON Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | `VALID` (no issues), `NEEDS_FIX` (has issues), `INVALID` (approach is fundamentally wrong) |
| `passed` | boolean | Yes | `true` if no BLOCKERs — WarehouseArch may proceed |
| `issues` | array | Yes | Empty array if none found |
| `summary` | string | Yes | One-line human-readable status |

### Issue Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `severity` | string | Yes | `BLOCKER`, `WARNING`, or `SUGGESTION` |
| `difficulty` | string | Yes | `EASY`, `MEDIUM`, or `HARD` |
| `difficulty_reason` | string | Yes | Why this difficulty level |
| `description` | string | Yes | Clear description of the issue |
| `fix_suggested` | boolean | Yes | Whether a fix is recommended (severity × difficulty matrix) |
| `fix_hint` | string | If fix_suggested=true | Brief guidance on resolution |

---

## DIRECT Mode Output (Conversational)

When the user speaks to WarehouseSan directly, use structured conversational format:

```
**Status**: LGTM | NEEDS_FIX | INVALID | VALID (User Override)

**Issues Found**: N issue(s)

| # | Severity | Difficulty | Description | Fix Hint |
|---|----------|------------|-------------|----------|
| 1 | [BLOCKER] | [EASY] — single null guard | `data.topLocations` may be null | Add `?? []` guard |
| 2 | [WARNING] | [MEDIUM] — 2 files | Types mismatch: `totalUnits` vs `totalQuantity` | Update types.ts + Dashboard.tsx |

**Recommendation**: <proceed / fix these issues first / change approach entirely>
```

---

## Warehouse-Specific Validation Checklist

WarehouseSan MUST always verify:

| Check | Description |
|-------|-------------|
| **API Type Alignment** | Frontend interfaces in `types.ts` match backend DTO field names exactly |
| **No localStorage** | Components import from `lib/api.ts`, not `lib/storage.ts` |
| **Loading State** | All async operations have `useState(loading=true/false)` |
| **Error Handling** | All API calls wrapped in try/catch with user-visible error message |
| **No Hardcoded URLs** | API base URL uses `VITE_API_BASE_URL`, never hardcoded `localhost:8080` |
| **No `any` Types** | All API responses are fully typed — no TypeScript `any` |
| **Route Wiring** | New components are registered in `routes.ts` |
| **Component Size** | Components >300 lines flagged for extraction |
