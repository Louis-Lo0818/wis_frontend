---
description: "Create a new feature document in the WIS Frontend blueprint"
---

# Create Blueprint Feature Document

Create a new feature document for the Warehouse Inventory System frontend blueprint, following the HyperDream planning format.

## When to Use

Use this prompt when planning a new frontend feature (P1 or P2) that needs a structured spec before implementation begins.

## Prerequisites

- Read the active blueprint index: `.agent_plan/day_dream/wis_frontend/00_index.md`
- Determine the next feature number (count existing `NN_feature_*.md` files)
- Decide tier: **Simple** (≤2 modules, no new API) vs **Full** (≥3 modules, new API calls)

## Steps

### 1. Assign Feature Number & Name

Check existing features in `.agent_plan/day_dream/wis_frontend/` and assign the next available number (e.g., `07` if `06` is the last).

### 2. Choose Template Tier

| Condition | Template |
|-----------|----------|
| ≤2 modules, no new API endpoint | `NN_feature_simple.template.md` |
| ≥3 modules OR new API endpoint OR P0 priority | `NN_feature.template.md` |

Templates are at: `my-react-app/data/.agent_plan/day_dream/templates/blueprint/`

### 3. Required Sections (Both Tiers)

Every feature doc MUST include:
- `## 📖 The Story` — Before/After visual table
- `### 🎯 One-Liner` — Elevator pitch (1 sentence)
- `## 🎯 Intent & Scope` — Priority (P0/P1/P2), Difficulty label, In/Out of scope
- `## ✅ Acceptance Criteria` — Checkboxes, each testable manually

### 4. Difficulty Labels (Required on Every Task)

| Label | Meaning | Allowed in P0? |
|-------|---------|----------------|
| `[KNOWN]` | Standard patterns, proven libraries | ✅ Yes |
| `[EXPERIMENTAL]` | Needs validation in our context | ⚠️ Conditional |
| `[RESEARCH]` | Active problem, no proven solution | ❌ Never |

### 5. Status Markers

Use ONLY these hybrid markers:
- `⏳ [TODO]` — Not started
- `🔄 [WIP]` — In progress
- `✅ [DONE]` — Complete
- `🚧 [BLOCKED:reason]` — Stuck (kebab-case reason)
- `🚫 [CUT]` — Removed from scope

### 6. Update the Blueprint Index

After creating the feature file:
1. Add a row to the **Document Index** table in `00_index.md`
2. Add a row to the **Features Overview** table in `01_executive_summary.md`
3. Add tasks to the appropriate phase in `80_implementation.md`

## Output

Create: `.agent_plan/day_dream/wis_frontend/NN_feature_{name}.md`

---

**Related**: [Blueprint Index](.agent_plan/day_dream/wis_frontend/00_index.md) | [Implementation Plan](.agent_plan/day_dream/wis_frontend/80_implementation.md)
