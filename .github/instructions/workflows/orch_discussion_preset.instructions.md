---
applyTo: "**/.github/agents/warehouse_orchestrator.agent.md"
---

# WarehouseOrch Discussion Preset

## Goals
- Structure multi-agent discussions to explore decisions, trade-offs, and approaches.
- Ensure every discussion reaches a concrete, documented consensus.
- Prevent endless debate via round limits and impasse handling.

---

## When This Applies

Trigger patterns: "discuss", "debate", "compare", "which approach", "should we", "what's better", "trade-offs", "options for"

---

## Discussion Protocol

### Phase Structure

```
PROPOSE → CHALLENGE → SYNTHESIZE → [DOCUMENT]
   ↓          ↓           ↓             ↓
 Define    Critique    Consensus    Record Result
```

---

## Participation Rules

| Rule | Value |
|------|-------|
| Max participants | 4 agents |
| Min participants | 2 agents |
| Default participants | WarehouseArch + WarehouseSan |
| Max rounds | 3 |
| Round time limit | 1 invocation per agent per round |
| Quorum for consensus | All participants agree or 1 dissents with accepted trade-off |

---

## Agent Selection Guide

| Discussion Topic | Include |
|-----------------|---------|
| Architecture / component design | WarehouseArch + WarehouseSan |
| Feature feasibility | WarehouseArch + WarehouseDream + WarehouseSan |
| Code quality / refactor | WarehouseIQGuard + WarehouseArch |
| Risk / breakage potential | WarehouseRed + WarehouseSan |
| UX / future roadmap | WarehouseDream + WarehouseArch |

---

## Discussion Steps

### 1. Frame the Question

State the question clearly before invoking any agents:
```
Discussion: [precise question being debated]
Context: [relevant codebase facts — components, API contracts, constraints]
Participants: [agents selected and why]
Expected output: [decision, ranked options, or proposal]
```

### 2. Phase 1: PROPOSE

Invoke each participant sequentially:
```yaml
task: "Propose your approach for: [question]"
context: "[full context]"
constraints: |
  - Reference actual codebase files (no hypotheticals)
  - Format: Proposal + Rationale + Trade-offs
  - Max: 3 proposals total across all participants
```

### 3. Phase 2: CHALLENGE

Invoke each participant to respond to the proposals:
```yaml
task: "Challenge or refine the proposals presented: [proposals summary]"
context: "[same context]"
constraints: |
  - Identify concrete risks or type mismatches
  - Propose mitigations for each risk raised
  - No new proposals — only refinements to existing ones
```

### 4. Phase 3: SYNTHESIZE

Invoke WarehouseSan as the synthesizer (always):
```yaml
task: "Synthesize the discussion into a final recommendation"
context: "Proposals: [list]. Challenges: [list]."
success_criteria: |
  - Single ranked recommendation (1st choice + fallback)
  - Explicit list of accepted trade-offs
  - Action items with owning agent
```

### 5. Impasse Handling

If round 3 ends without consensus:
- WarehouseSan casts deciding vote with documented rationale
- Record: "IMPASSE resolved by WarehouseSan: [decision]"
- Flag to user: ⚠️ Impasse required adjudication

### 6. Document Consensus

Always record outcome:
- Short decisions: Summarize inline in response
- Architectural decisions: Ask user if they want output saved to `.agent_plan/decisions/`
- Action items: List with assigned agent and priority

---

## Output Format

```markdown
## Discussion: [question]

**Participants**: [agents]  
**Rounds**: [n]  
**Outcome**: CONSENSUS | IMPASSE-RESOLVED

### Decision
[Recommended approach]

### Accepted Trade-offs
- [trade-off 1]
- [trade-off 2]

### Rejected Options
- [option]: [reason]

### Action Items
| Action | Owner | Priority |
|--------|-------|----------|
| ...    | ...   | ...      |
```
