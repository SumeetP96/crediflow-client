import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import RouterRedirect from '../components/router-redirect/RouterRedirect';
import Agents from '../pages/agents/Agents';
import Customers from '../pages/customers/Customers';
import Dashboard from '../pages/dashboard/Dashboard';
import InvoiceCategories from '../pages/invoice-categories/InvoiceCategories';
import Invoices from '../pages/invoices/Invoices';
import Masters from '../pages/masters/Masters';
import Profile from '../pages/profile/Profile';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';
import TransactionTypes from '../pages/transaction-types/TransactionTypes';
import Transactions from '../pages/transactions/Transactions';
import UserForm from '../pages/user-form/UserForm';
import UsersListing from '../pages/users-listing/UsersListing';
import { AppRoutes } from './routes';

export const router = createBrowserRouter([
  {
    path: AppRoutes.APP,
    element: <App />,
    children: [
      {
        path: AppRoutes.SETTINGS,
        element: <Settings />,
      },
      {
        path: AppRoutes.PROFILE,
        element: <Profile />,
      },
      {
        path: AppRoutes.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: AppRoutes.MASTERS,
        element: <RouterRedirect from={AppRoutes.MASTERS} to={AppRoutes.MASTERS_HOME} />,
        children: [
          {
            path: AppRoutes.MASTERS_HOME,
            element: <Masters />,
          },
          {
            path: AppRoutes.USERS,
            element: <RouterRedirect from={AppRoutes.USERS} to={AppRoutes.USERS_LIST} />,
            children: [
              {
                path: AppRoutes.USERS_LIST,
                element: <UsersListing />,
              },
              {
                path: AppRoutes.USERS_CREATE,
                element: <UserForm />,
              },
              {
                path: AppRoutes.USERS_UPDATE,
                element: <UserForm />,
              },
            ],
          },
          {
            path: AppRoutes.CUSTOMERS,
            element: <Customers />,
          },
          {
            path: AppRoutes.AGENTS,
            element: <Agents />,
          },
          {
            path: AppRoutes.INVOICE_CATEGORIES,
            element: <InvoiceCategories />,
          },
          {
            path: AppRoutes.TRANSACTION_TYPES,
            element: <TransactionTypes />,
          },
        ],
      },
      {
        path: AppRoutes.INVOICES,
        element: <Invoices />,
      },
      {
        path: AppRoutes.TRANSACTIONS,
        element: <Transactions />,
      },
      {
        path: AppRoutes.REPORTS,
        element: <Outlet />,
        children: [
          {
            path: AppRoutes.REPORTS_HOME,
            element: <Reports />,
          },
        ],
      },
    ],
  },
]);
