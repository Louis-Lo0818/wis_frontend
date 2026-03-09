---
applyTo: "**/.github/instructions/**/*.instructions.md"
---

# Instructions File Authoring Guidelines

## Goals
- Create rule sets that automatically apply when editing matching files.
- Ensure consistent code style, structure, and conventions across the project.
- Provide clear, enforceable guidelines for all Warehouse agents.

---

## Required Structure

Each instructions file MUST include:

1. **YAML Header**: Frontmatter with `applyTo` glob pattern (and optionally `description`).
2. **Title**: A clear `# Title` heading.
3. **Goals Section**: What these instructions aim to achieve.
4. **Rules/Guidelines**: The actual rules to enforce.
5. **Template/Examples**: If applicable, provide a template.

---

## Template

```markdown
---
applyTo: "<glob pattern for target files>"
---

# <Instructions Title>

## Goals
- <Goal 1>
- <Goal 2>

## Rules
1. **<Rule Name>**: <Description>
2. **<Rule Name>**: <Description>

## Template (if applicable)
\`\`\`
<Template content>
\`\`\`

## Examples (if applicable)
<Good example>
```

---

## `applyTo` Pattern Reference

| Pattern | Matches |
|---------|---------|
| `**/*.{ts,tsx}` | All TypeScript/React files |
| `src/app/components/*.tsx` | Page component files only |
| `src/app/lib/api.ts` | Exactly the API client file |
| `**/.github/agents/*.agent.md` | All warehouse agent files |
| `**/.github/instructions/**/*.instructions.md` | All instruction files |
| `**/.github/prompts/*.prompt.md` | All prompt files |

---

## Subfolder Structure

Instructions are organized into subfolders by domain:

| Subfolder | Purpose | `applyTo` Target |
|-----------|---------|------------------|
| `agents/` | Agent authoring rules, output formats | `*.agent.md` |
| `formats/` | How to write instructions and prompts | `*.instructions.md`, `*.prompt.md` |
| `modules/` | React component and lib module guidelines | `src/app/**/*.{ts,tsx}` |
| `planning/` | Blueprint and asset authoring | `.agent_plan/**/*.md` |
| `workflows/` | Orchestrator workflow presets | `warehouse_orchestrator.agent.md` |

Root-level files (`project_context`, `api_client`, `react_components`) apply broadly to all source files and take precedence as the base layer.

---

## Naming Convention

- Lowercase snake_case ending in `.instructions.md`
- Placed in the appropriate subfolder under `.github/instructions/`
- Examples: `agents_format.instructions.md`, `orch_implementation_preset.instructions.md`

---

## Best Practices

- Be specific with `applyTo` to avoid over-matching.
- Use imperative tone: "MUST", "NEVER", "ALWAYS".
- Provide concrete examples of correct vs incorrect patterns.
- Keep rules concise and immediately actionable.
- Do NOT repeat rules that already exist in `project_context.instructions.md` — extend, don't duplicate.
