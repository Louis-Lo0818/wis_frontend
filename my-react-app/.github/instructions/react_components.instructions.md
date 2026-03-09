---
applyTo: "src/app/components/*.tsx"
---

# React Component Guidelines

## Goals
- Ensure consistent component structure across all page components
- Enforce proper API integration patterns
- Maintain TypeScript type safety

## Rules

1. **Functional Components Only**: Use function declarations with hooks. No class components.

2. **API Integration Pattern**: All data fetching must follow this pattern:
   ```tsx
   const [data, setData] = useState<Type[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   ```

3. **Error Handling**: Every API call must be wrapped in try/catch with user-friendly error messages.

4. **Loading States**: Show loading indicators during async operations. Never show stale data.

5. **No localStorage**: Import from `../lib/api`, NOT from `../lib/storage` for production data.

6. **Tailwind CSS**: Use Tailwind utility classes exclusively. No inline styles. No CSS modules.

7. **shadcn/ui Components**: Use existing UI components from `components/ui/` before building custom ones.

8. **Component Size**: Target <200 lines. Extract sub-components if exceeding 300 lines.

9. **Naming**: PascalCase for component files. Match filename to export name.

10. **Imports Order**: React → third-party → local components → lib/api → types → styles.
