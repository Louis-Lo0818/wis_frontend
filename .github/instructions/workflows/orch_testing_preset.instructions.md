---
applyTo: "**/.github/agents/warehouse_orchestrator.agent.md"
---

# WarehouseOrch Testing Preset

## Goals
- Orchestrate structured frontend test workflows.
- Validate component behaviour, API types, and edge cases before shipping.
- Use WarehouseRed to find adversarial failures after initial spec tests pass.

---

## When This Applies

Trigger patterns: "test", "validate", "QA", "check", "attack", "verify", "write tests", "find bugs in", "is this correct"

---

## Testing Protocol

### Phase Structure

```
PLAN (WarehouseSan) → UI-TEST (WarehouseArch) → ATTACK (WarehouseRed) → FINAL (WarehouseSan)
        ↓                      ↓                         ↓                       ↓
   Define Strategy         Spec & Fix               Adversarial Attack       Final Verdict
```

---

## Testing Steps

### 1. Initialize

- Parse the target component or feature to test
- Identify its API dependencies and state transitions
- State: "Starting test workflow for: [target]"

### 2. Phase 1: PLAN

Invoke WarehouseSan:
```yaml
task: "Create a test plan for: [target component or feature]"
context: |
  Target: [component name and file path]
  API dependencies: [endpoints used]
  User actions: [what users can do with this component]
success_criteria: |
  - List of test cases (input → expected output)
  - List of edge cases (nulls, empty arrays, network error, max values)
  - Risk areas flagged for WarehouseRed attack
output_format: "json"
```

### 3. Phase 2: UI-TEST

Invoke WarehouseArch (max 3 cycles with WarehouseSan):
```yaml
task: "Implement test cases for: [target] following the test plan"
context: "Test plan from WarehouseSan: [summary]"
success_criteria: |
  - Tests cover all normal-path cases from the plan
  - Tests verify loading state, error state, and success state
  - TypeScript types match backend DTOs
  - Component renders without crashing for each state
```

If WarehouseSan validates and returns issues:
- Invoke WarehouseArch again with the failure list
- Max 3 cycles. If still failing after cycle 3 → escalate to user

### 4. Phase 3: ATTACK

Invoke WarehouseRed:
```yaml
task: "Adversarial attack: [target component or feature]"
context: "Spec tests passed. Now find what breaks it."
scope: |
  - Frontend only (React state, Tailwind rendering, API response handling)
  - Do NOT test Spring Boot endpoints directly
  - Attack vectors: null responses, malformed data, rapid user interactions,
    concurrent API calls, empty warehouse states, very large datasets
success_criteria: "Report failures, unexpected behaviours, and UX edge cases"
```

### 5. Phase 4: FINAL

Invoke WarehouseSan:
```yaml
task: "Final validation after testing: [target]"
context: |
  Test plan: [summary]
  Spec test results: [pass/fail list]
  WarehouseRed findings: [attack results]
success_criteria: "Issue final PASS or FAIL verdict with severity classification"
output_format: "json"
```

### 6. Finalize — Report to User

```markdown
## Test Results: [target]

**Verdict**: ✅ PASS | ❌ FAIL | ⚠️ CONDITIONAL PASS

### Coverage
- Normal paths: [n passed / n total]
- Edge cases: [n passed / n total]
- Adversarial: [n found by WarehouseRed]

### Issues Found
| Severity | Description | File | Line |
|----------|-------------|------|------|
| CRITICAL | ...         | ...  | ...  |
| HIGH     | ...         | ...  | ...  |

### Recommended Fix
[Action items with owning agent]
```

---

## Edge Case Reference for Warehouse UI

| Category | Edge Cases to Always Test |
|----------|--------------------------|
| Inventory list | Empty warehouse, null quantities, 10,000+ items |
| Transfer form | Source === Destination, zero quantity, missing product |
| CSV import | Empty file, wrong headers, duplicate rows, 1MB+ file |
| Dashboard | All counts zero on startup, backend unreachable on load |
| API calls | Network timeout, 500 error, 404 not found, malformed JSON |
