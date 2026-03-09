---
applyTo: "**/.github/prompts/*.prompt.md"
---

# Prompt File Authoring Guidelines

## Goals
- Create reusable prompt templates that guide Warehouse agents through specific tasks.
- Ensure prompts are clear, actionable, and self-contained.
- Standardize `.prompt.md` structure for consistent agent behavior.

---

## Required Structure

Each prompt file MUST include:

1. **YAML Header**: Frontmatter with `description` field.
2. **Title**: A clear `# Title` heading.
3. **Task Description**: Explanation of what the prompt accomplishes.
4. **Prerequisites**: List any conditions that must be true before starting.
5. **Steps/Instructions**: Clear numbered steps or labeled sections.
6. **Default Behavior**: State any skip conditions or defaults at the bottom.

---

## Template

```markdown
---
description: "<Short description — shown in chat input>"
---

# <Prompt Title>

<Brief description of what this prompt does and when to use it.>

## Prerequisites
- <Condition 1>
- <Condition 2>

## Steps

### 1. <Section Name>
<Explanation of this step.>

**Actions:**
1. <Action 1>
2. <Action 2>

### 2. <Section Name> (if applicable)
<Explanation.>

---

**Default behavior**: <State any default behaviors or skip conditions.>
**To override**: <How the user can modify the default.>
```

---

## Warehouse Prompt Inventory

| Prompt File | Purpose |
|-------------|---------|
| `create_page_component.prompt.md` | Scaffold a new page component wired to API |
| `migrate_to_api.prompt.md` | Migrate a component from localStorage to REST API |
| `validate_frontend.prompt.md` | Run WarehouseSan validation pass on a component |
| `create_blueprint_feature.prompt.md` | Create a new feature doc in the WIS blueprint |

---

## Naming Convention

- Lowercase snake_case ending in `.prompt.md`
- Verb-noun pattern preferred: `create_page_component`, `migrate_to_api`
- Placed in `.github/prompts/`

---

## Best Practices

- Be explicit about what gets skipped by default.
- Include clear override instructions for optional steps.
- Use imperative tone: "Read...", "Check...", "Verify...", "Update..."
- Reference relevant `.instructions.md` files for format context.
- Link to the blueprint doc if the prompt affects planning files.
- Keep prompts self-contained — don't assume the agent has prior context.
