---
description: Common rules and semantic definitions for all Warehouse agent files
applyTo: "**/*.agent.md"
---

# Warehouse Agent Common Rules

This instruction file provides **authoring-time guidance** for creating and maintaining Warehouse agent files. It defines the semantic purpose of each section and canonical templates for required rules.

## Section Semantics

| Section | Purpose | Mental Model | Format |
|---------|---------|--------------|--------|
| `<stopping_rules>` | Conditions that trigger IMMEDIATE ABORT | Circuit breaker | "STOP IF..." / "NEVER..." |
| `<critical_rules>` | Persistent behavioral norms that shape HOW the agent works | Operating parameters | "ALWAYS..." / methodology constraints |
| `<core_philosophy>` | WHY the agent behaves this way — identity and values | Agent DNA | Principles, not rules |

**Key Principle**: If a rule is a halt trigger, put it in `<stopping_rules>` ONLY. If it's a methodology norm, put it in `<critical_rules>` ONLY. Never duplicate the same rule in both sections.

---

## Canonical Rule Templates

### 1. User "No Edit" Override
**Use in**: Agents with file-edit tools (WarehouseArch, WarehouseIQGuard, WarehouseDream)
**Section**: `<stopping_rules>`

```
If the user says "no edit", "discussion only", "don't edit", "read only": engage in discussion only. NEVER create, edit, or delete any file.
```

### 2. Stopping Rules Persistence Meta-Rule
**Use in**: All agents
**Section**: `<critical_rules>`

```
- **Stopping Rules Bind**: All `<stopping_rules>` are HARD CONSTRAINTS. Check them BEFORE each tool invocation.
```

### 3. Truthfulness Principle
**Use in**: All agents
**Section**: `<core_philosophy>`

```
**Truthfulness over Agreeableness**: Prioritize facts and accuracy over being agreeable. Politely correct misconceptions rather than validating them.
```

### 4. Project Context Read Requirement
**Use in**: All agents that consume project structure (WarehouseArch, WarehouseOrch, WarehouseSan)
**Section**: `<project_context>` or agent workflow step

```
Read `.github/instructions/project_context.instructions.md` for full project context before proceeding.
```

### 5. No localStorage Rule
**Use in**: WarehouseArch, WarehouseSan
**Section**: `<stopping_rules>`

```
STOP if you are about to use localStorage for new features. All data operations go through lib/api.ts.
```

---

## De-duplication Guidelines

When the same constraint appears in both `<stopping_rules>` and `<critical_rules>`:

1. **Ask**: Is this a HALT trigger or a METHODOLOGY norm?
2. **If halt trigger**: Keep in `<stopping_rules>`, describe the methodology in `<critical_rules>` (not the halt condition)

| ❌ Wrong | ✅ Right |
|----------|----------|
| stopping_rules: "STOP if >5 files" + critical_rules: "Scope limit: 1-5 files" | stopping_rules: "STOP if >5 files" + critical_rules: "Scope Discipline: focused, file-by-file analysis" |

---

## Why Each File is Self-Contained

VS Code Custom Agents load each `.agent.md` file **in isolation**. There is no runtime import mechanism. Therefore:

- Safety-critical rules MUST be in each agent's file (not just referenced globally)
- This instruction file provides **authoring consistency**, not runtime injection
- Duplication across agents is architecturally correct; duplication WITHIN an agent is the anti-pattern
