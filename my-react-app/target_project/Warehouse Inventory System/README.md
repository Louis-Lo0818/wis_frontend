# Warehouse Inventory System

A lightweight web-based warehouse inventory management system built with React and TypeScript. This application allows you to manage product data and track inventory levels across multiple warehouse locations.

## Features

- **CSV Data Import**: Bulk upload products and inventory data via CSV files
- **Inventory Viewing**: Search and view inventory levels by product code across all locations
- **Stock Transfer**: Transfer inventory between warehouse locations with real-time validation
- **Dashboard**: Overview of total products, locations, and inventory levels
- **Data Export**: Download current inventory and product data as CSV files

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Storage**: LocalStorage (client-side persistence)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build the application for production:

```bash
npm run build
# or
pnpm run build
```

The built files will be in the `dist` directory.

### Testing

To test the application:

1. Navigate to the **Import Data** page
2. Download the CSV templates
3. Upload the sample CSV files or create your own
4. View inventory levels in the **View Inventory** page
5. Transfer stock between locations in the **Transfer** page

## CSV File Formats

### Products CSV
```csv
code,name,weight
PRD001,Laptop Computer,2.5
PRD002,Wireless Mouse,0.1
PRD003,USB-C Cable,0.05
```

Fields:
- `code`: Unique product identifier (e.g., PRD001)
- `name`: Product name
- `weight`: Product weight in kilograms

### Inventory CSV
```csv
productCode,location,quantity
PRD001,TKO,100
PRD001,CSW,50
PRD002,KWN,200
```

Fields:
- `productCode`: Must match a product code from products CSV
- `location`: Location code (alphabetic, no spaces, e.g., TKO, CSW)
- `quantity`: Number of units at this location

## Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Dashboard.tsx           # Main dashboard with stats
│   │   ├── ImportData.tsx          # CSV upload interface
│   │   ├── Layout.tsx              # App layout with navigation
│   │   ├── TransferInventory.tsx   # Inventory transfer UI
│   │   └── ViewInventory.tsx       # Inventory search and display
│   ├── lib/
│   │   ├── csv.ts                  # CSV parsing utilities
│   │   └── storage.ts              # LocalStorage management
│   ├── App.tsx                     # Root component
│   ├── routes.ts                   # React Router configuration
│   └── types.ts                    # TypeScript type definitions
└── styles/
    └── theme.css                   # Global styles
```

## Development Diary

### Day 1: Project Setup & Core Architecture
**Focus**: Foundation and data layer

**Learning & Thinking**:
- Analyzed requirements: CSV import, inventory viewing, and transfer functionality
- Chose LocalStorage for persistence - simple, no backend needed, good for prototype
- Designed data model: Products separate from Inventory items for normalization
- Decided on React Router for multi-page experience (better UX than single-page)

**Implementation**:
- Set up TypeScript interfaces for type safety (Product, InventoryItem, InventoryLevel)
- Created storage layer with CRUD operations
- Implemented CSV parsing with flexible header detection
- Built sample data generator for testing
- Key challenge: Handling inventory aggregation across locations efficiently

**Outcome**: Solid foundation with type-safe data management and CSV handling

### Day 2: User Interface & Navigation
**Focus**: UI components and user workflows

**Learning & Thinking**:
- Prioritized UX: Clear navigation, immediate feedback, error handling
- Studied inventory management patterns - decided on location-based grouping
- Considered edge cases: duplicate imports, zero inventory, invalid transfers
- Used Tailwind for rapid UI development with consistent design

**Implementation**:
- Built responsive navigation layout with active state indicators
- Created Dashboard with key metrics and quick actions
- Implemented Import Data page with drag-drop zones and templates
- Developed View Inventory with search and location breakdown
- Added visual feedback: success/error messages, loading states
- Key challenge: Making complex inventory data easy to understand at a glance

**Outcome**: Intuitive interface with all required features accessible

### Day 3: Transfer Feature & Polish
**Focus**: Inventory transfers and production readiness

**Learning & Thinking**:
- Transfer validation critical: prevent overselling, location conflicts
- Real-time preview helps users avoid mistakes
- Data integrity: atomic operations, consistent state updates
- Documentation important for handoff and maintenance

**Implementation**:
- Built Transfer page with step-by-step form and live preview
- Added validation: quantity checks, location verification, product existence
- Implemented transfer logic with rollback on error
- Created comprehensive README with setup, usage, CSV formats
- Added CSV export for data backup
- Polished UI: better spacing, clearer labels, responsive design
- Key challenge: Ensuring data consistency during concurrent operations

**Outcome**: Production-ready system with all bonus features (TypeScript UI, comprehensive docs)

**Bonus Features Completed**:
- ✅ TypeScript/JavaScript UI (React + TypeScript)
- ✅ Comprehensive README with setup instructions
- ✅ Sample data for immediate testing
- ✅ CSV templates and export functionality
- ✅ Responsive design

**Additional Features Added**:
- Dashboard with analytics
- Real-time inventory validation
- CSV template download
- Data export functionality
- Responsive mobile-friendly design

## Notes

- Data is stored in browser LocalStorage - it persists between sessions but is local to each browser
- For production use, consider migrating to a backend database (PostgreSQL, MySQL, etc.)
- Location codes are automatically converted to uppercase and spaces are removed
- CSV files can have headers (they will be auto-detected and skipped)
- Duplicate product codes in CSV uploads will update existing products
- Inventory quantities are additive when importing (existing + new)

## Future Enhancements

- Backend API with database persistence
- User authentication and multi-tenant support
- Barcode scanning for mobile devices
- Inventory history and audit logs
- Low stock alerts and notifications
- Advanced reporting and analytics
- Batch transfer operations
- Export to Excel/PDF formats

## License

This project was created as a technical assessment task.
