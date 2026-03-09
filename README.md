# Warehouse Inventory System — Frontend (React)

React/TypeScript frontend for the Warehouse Inventory System. Built with Vite, Tailwind CSS 4.x, React Router 7.x, and Axios.

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18+ |
| npm | 9+ |

The Spring Boot backend must be running on **http://localhost:8080** before starting the frontend.

---

## Install, Test & Run

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app starts on **http://localhost:5173**.

### Test

```bash
npm run test                # (when tests are added)
npm run lint                # ESLint code quality checks
tsc --noEmit                # TypeScript type checking
```

### Compile for Production

```bash
npm run build               # outputs to dist/
npm run preview             # preview the production build locally
```

---

## Environment Variables

Create a `.env` file in the project root (optional — defaults to `http://localhost:8080/api`):

```bash
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Summary stats: products, locations, total units |
| `/import` | ImportData | Upload products CSV and inventory CSV |
| `/inventory` | ViewInventory | Browse and search inventory by product code |
| `/transfer` | TransferInventory | Move stock between warehouse locations |
| `/docs` | Documentation | Full-stack technical documentation |

---

## Project Structure

```
src/
├── app/
│   ├── App.tsx              # RouterProvider entry point
│   ├── routes.ts            # React Router route definitions
│   ├── types.ts             # TypeScript interfaces
│   ├── components/
│   │   ├── Layout.tsx       # Persistent nav bar
│   │   ├── Dashboard.tsx
│   │   ├── ImportData.tsx
│   │   ├── ViewInventory.tsx
│   │   ├── TransferInventory.tsx
│   │   └── Documentation.tsx
│   └── lib/
│       ├── api.ts           # Axios HTTP client (all backend calls)
│       └── csv.ts           # CSV parse/generate helpers
└── styles/
    ├── index.css
    └── theme.css
```

---

## Planning & Architecture

This project uses **Blueprint-tier planning** to guide development. See [`.agent_plan/day_dream/wis_frontend/`](.agent_plan/day_dream/wis_frontend/) for:

| File | Purpose |
|------|---------|
| `00_index.md` | Navigation hub & project phases |
| `01_executive_summary.md` | Vision, success metrics, feature overview |
| `02_architecture.md` | System diagram, API contracts, type mappings |
| `03-06_feature_*.md` | Feature specifications & implementation guides |
| `80_implementation.md` | Phase status, completed/pending tasks |
| `81_module_structure.md` | Module responsibilities & anti-patterns |
| `99_references.md` | All API endpoints, tech stack links |

**Before starting new work:** Always check `80_implementation.md` to align with the current phase.

---

## Full-Stack Start (both services)

```bash
# Terminal 1 — Spring Boot backend
cd ../my-spring-project
./mvnw spring-boot:run

# Terminal 2 — React frontend
cd ../my-react-app
npm run dev
```

Then open **http://localhost:5173**.


## Tech Stack

- React 18.3
- TypeScript 5.x
- Vite 6.x
- Tailwind CSS 4.x
- React Router 7.x
- Axios
- Lucide React (icons)

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
