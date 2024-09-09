import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Agents from '../pages/agents/Agents';
import Customers from '../pages/customers/Customers';
import Dashboard from '../pages/dashboard/Dashboard';
import InvoiceCategories from '../pages/invoice-categories/InvoiceCategories';
import Invoices from '../pages/invoices/Invoices';
import Reports from '../pages/reports/Reports';
import TransactionTypes from '../pages/transaction-types/TransactionTypes';
import Transactions from '../pages/transactions/Transactions';
import Users from '../pages/users/Users';
import { Routes } from './routes';

export const router = createBrowserRouter([
  {
    path: Routes.APP,
    element: <App />,
    children: [
      {
        path: Routes.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: Routes.USERS,
        element: <Users />,
      },
      {
        path: Routes.CUSTOMERS,
        element: <Customers />,
      },
      {
        path: Routes.AGENTS,
        element: <Agents />,
      },
      {
        path: Routes.INVOICE_CATEGORIES,
        element: <InvoiceCategories />,
      },
      {
        path: Routes.INVOICES,
        element: <Invoices />,
      },
      {
        path: Routes.TRANSACTION_TYPES,
        element: <TransactionTypes />,
      },
      {
        path: Routes.TRANSACTIONS,
        element: <Transactions />,
      },
      {
        path: Routes.REPORTS,
        element: <Reports />,
      },
    ],
  },
]);
