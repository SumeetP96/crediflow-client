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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/customers',
        element: <Customers />,
      },
      {
        path: '/agents',
        element: <Agents />,
      },
      {
        path: '/invoice-categories',
        element: <InvoiceCategories />,
      },
      {
        path: '/invoices',
        element: <Invoices />,
      },
      {
        path: '/transaction-types',
        element: <TransactionTypes />,
      },
      {
        path: '/transactions',
        element: <Transactions />,
      },
      {
        path: '/reports',
        element: <Reports />,
      },
    ],
  },
]);
