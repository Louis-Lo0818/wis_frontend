import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { ImportData } from "./components/ImportData";
import { ViewInventory } from "./components/ViewInventory";
import { TransferInventory } from "./components/TransferInventory";
import { Documentation } from "./components/Documentation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "import", Component: ImportData },
      { path: "inventory", Component: ViewInventory },
      { path: "transfer", Component: TransferInventory },
      { path: "docs", Component: Documentation },
    ],
  },
]);