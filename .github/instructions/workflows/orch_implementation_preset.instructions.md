---
applyTo: "**/.github/agents/warehouse_orchestrator.agent.md"
---

# WarehouseOrch Implementation Preset

## Goals
- Orchestrate frontend implementation workflows with mandatory quality gates.
- Ensure pre and post sanity checks via WarehouseSan.
- Keep WarehouseOrch context lightweight by delegating all file work to subagents.

---

## When This Applies

Trigger patterns: "implement", "build", "create", "fix", "add feature", "migrate", "wire up"

---

## Implementation Protocol

### Phase Structure

```
PRE-CHECK (WarehouseSan) → IMPLEMENT (WarehouseArch) → POST-CHECK (WarehouseSan) → [DOC-UPDATE (WarehouseDream)]
       ↓                          ↓                           ↓                            ↓
  Validate Feasibility       Build Feature             Validate Result            Update Blueprint
```

### Phase Flow

```
Phase 1: PRE-CHECK
  → WarehouseSan validates feasibility and API contract alignment
  → If BLOCKER found: Report to user, HALT
  → If LGTM: Continue

Phase 2: IMPLEMENT
  → WarehouseArch implements the feature
  → If fails: Report issues, suggest WarehouseSan retry or fix
  → If succeeds: Continue

Phase 3: POST-CHECK
  → WarehouseSan validates the implementation
  → If BLOCKER found: Return to Phase 2 (max 2 retries)
  → If LGTM: Continue

Phase 4: DOC-UPDATE (Conditional)
  → Trigger: Request explicitly mentions blueprint or implementation plan
  → WarehouseDream marks completed tasks in 80_implementation.md
  → If NOT triggered: Skip to Finalize
```

---

## Orchestration Steps

### 1. Initialize

- Parse the feature/fix from the user request
- Identify target components and API endpoints affected
- State: "Starting implementation workflow for: [feature]"

### 2. Phase 1: PRE-CHECK

Invoke WarehouseSan:
```yaml
task: "Pre-implementation sanity check for: [feature description]"
context: |
  User wants to implement: [full request]
  Target files: [components and lib/api.ts if known]
  Relevant API endpoints: [endpoints if known]
success_criteria: "Validate feasibility, check API type alignment, identify risks"
output_format: "json"
```

Evaluate:
- `passed: true` → Continue to Phase 2
- `passed: false` or BLOCKERs → Report issues to user, HALT

### 3. Phase 2: IMPLEMENT

Invoke WarehouseArch:
```yaml
task: "Implement: [feature description]"
objective: "[The larger goal this serves]"
context: "Pre-check passed. WarehouseSan notes: [summary]"
success_criteria: "Complete implementation following warehouse coding standards"
output_format: "summary"
execution_guidance: |
  ## Pre-Coding Verification
  - Read existing components before modifying — do NOT guess structure
  - Verify API function signatures in lib/api.ts — do NOT guess return types
  - Check types.ts for existing interfaces before creating new ones

  ## Coding Standards
  - Functional React components only (no class components)
  - All API responses typed — no TypeScript `any`
  - File size: target ≤200 lines, MUST refactor if exceeding 300
  - Import order: React → third-party → local components → lib/api → types
  - All API calls in useEffect with try/catch and loading/error state

  ## Anti-Pattern Checks
  - NEVER use localStorage for production data
  - NEVER create a new axios instance — use the one from lib/api.ts
  - NEVER hardcode http://localhost:8080 — use VITE_API_BASE_URL
  - NEVER use inline styles — use Tailwind utility classes

  ## Completion Criteria
  - Feature renders correctly in browser
  - Loading state visible during API call
  - Error state with Retry button on API failure
  - No TypeScript errors (`tsc --noEmit` passes)
```

### 4. Phase 3: POST-CHECK

Invoke WarehouseSan:
```yaml
task: "Post-implementation validation for: [feature]"
context: "WarehouseArch completed: [summary of what was built]"
success_criteria: "Verify types match backend DTOs, patterns followed, no regressions"
output_format: "json"
```

Evaluate:
- `passed: true` → Continue to Phase 4 if DOC-UPDATE triggered, else Finalize
- `passed: false` → Return to Phase 2 (retry count: max 2)

### 5. Phase 4: DOC-UPDATE (Conditional)

Trigger only when request mentions "update blueprint", "mark done", or "implementation plan":

Invoke WarehouseDream:
```yaml
task: "Update 80_implementation.md to mark completed tasks for: [feature]"
context: "Feature implemented and validated: [summary]. Update status markers from ⏳ to ✅"
```

### 6. Finalize

Report to user:
- ✅ SUCCESS: All phases passed, feature complete
- ⚠️ PARTIAL: Built but warnings remain (list them)
- ❌ FAILED: Blocker found, implementation halted (state what and why)
