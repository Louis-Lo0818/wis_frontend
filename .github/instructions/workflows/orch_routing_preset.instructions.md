---
applyTo: "**/.github/agents/warehouse_orchestrator.agent.md"
---

# WarehouseOrch Routing Preset

## Goals
- Route miscellaneous requests to the most appropriate Warehouse agent.
- Apply when the request does not clearly match the implementation, discussion, or testing presets.
- Prevent WarehouseOrch from doing agent work itself.

---

## When This Applies

Use as a fallback routing pattern when no other preset matches:
- Not implementation/build/fix → use `orch_implementation_preset`
- Not discuss/debate/compare → use `orch_discussion_preset`
- Not test/validate/QA → use `orch_testing_preset`

---

## Routing Patterns

### Pattern A: Single-Agent Delegation

For requests clearly owned by one domain agent.

```
User Request → Identify Domain → Delegate to Single Agent → Report Result
```

**Steps:**
1. Identify the domain (see Agent Selection Table below)
2. Construct a delegation prompt with the full user request as task context
3. Set `success_criteria` explicitly — do NOT leave it to the agent to infer
4. Report the agent's output directly to the user

### Pattern B: Multi-Phase Delegation

For requests needing sequential handoff between agents.

```
Agent A (Phase 1) → Agent B (Phase 2) → WarehouseSan (Validate) → Report
```

**Use when:**
- A feature needs to be planned (WarehouseDream) then built (WarehouseArch)
- Code needs to be audited (WarehouseIQGuard) then fixed (WarehouseArch)
- An idea needs to be verified (WarehouseSan) then prototyped (WarehouseArch)

### Pattern C: Parallel Delegation

For independent sub-tasks that don't depend on each other's outputs.

```
        ┌─ Agent A (Task A1) ─┐
Request ─┤                     ├─ WarehouseSan (Consolidate) → Report
        └─ Agent B (Task B1) ─┘
```

**Use when:**
- Multiple independent components need code review simultaneously
- Multiple features need feasibility checks at the same time
- Restriction: max 3 parallel agent calls at once; requires WarehouseSan to consolidate

---

## Agent Selection Table

| Request Type | Primary Agent | Secondary Agent |
|-------------|---------------|-----------------|
| React component implementation | WarehouseArch | — |
| API client / lib/api.ts work | WarehouseArch | WarehouseSan |
| Code review / anti-pattern audit | WarehouseIQGuard | — |
| Feature ideation / UX proposal | WarehouseDream | — |
| Blueprint update / documentation | WarehouseDream | — |
| Type validation / API contract check | WarehouseSan | — |
| Finding edge cases / breakage risks | WarehouseRed | — |
| Refactoring / reducing complexity | WarehouseIQGuard | WarehouseArch |
| "Is this correct?" / plan review | WarehouseSan | — |
| Multi-concern requests | WarehouseOrch (route Pattern B) | — |

---

## Delegation Prompt Template

```yaml
task: "[Full user request restated as an actionable task]"
objective: "[The broader goal this serves in the warehouse project]"
context: |
  [Relevant codebase facts: affected files, API endpoints, current behaviour]
success_criteria: "[What DONE looks like — be explicit]"
constraints: |
  - Reference actual files in the workspace — no hypotheticals
  - Follow rules in .github/instructions/project_context.instructions.md
  - Do not create new abstractions for one-time operations
output_format: "[json | markdown | summary]"
```

---

## Delegation Principles

1. **Objective-first**: Always state the final goal, not just the immediate step
2. **Context-rich**: Pass enough codebase context so the agent doesn't need to re-read the same files
3. **Completion-autonomous**: The delegated agent owns its task end-to-end; WarehouseOrch should not micro-manage steps
4. **No double work**: If WarehouseSan ran a pre-check, pass its output to WarehouseArch — do not re-check the same things
5. **Fallback explicit**: Tell the agent what to do if it hits a blocker (e.g., "if blocked, return HALT with reason")

---

## Routing Decision Flowchart

```
User Request
    │
    ├── Contains "implement/build/fix/add" ──────→ orch_implementation_preset
    ├── Contains "discuss/debate/which/compare" ──→ orch_discussion_preset
    ├── Contains "test/validate/QA/attack" ───────→ orch_testing_preset
    │
    └── OTHER
         │
         ├── Single domain clear? ────────────────→ Pattern A (Single-Agent)
         ├── Sequential phases needed? ───────────→ Pattern B (Multi-Phase)
         ├── Independent sub-tasks? ─────────────→ Pattern C (Parallel)
         └── Ambiguous? ─────────────────────────→ Ask user to clarify
```
