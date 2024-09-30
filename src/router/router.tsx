import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import LoaderFullscreen from '../components/loader-fullscreen/LoaderFullscreen';
import ProtectedRoutes from '../components/protected-routes/ProtectedRoutes';
import RouterRedirect from '../components/router-redirect/RouterRedirect';
import { breadcrumbRoutesId } from '../helpers/constants';
import Agents from '../pages/agents/Agents';
import Customers from '../pages/customers/Customers';
import Dashboard from '../pages/dashboard/Dashboard';
import InvoiceCategories from '../pages/invoice-categories/InvoiceCategories';
import Invoices from '../pages/invoices/Invoices';
import Login from '../pages/login/Login';
import Masters from '../pages/masters/Masters';
import NotFound from '../pages/not-found/NotFound';
import Profile from '../pages/profile/Profile';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';
import TransactionTypes from '../pages/transaction-types/TransactionTypes';
import Transactions from '../pages/transactions/Transactions';
import UserForm from '../pages/user-form/UserForm';
import UsersListing from '../pages/users-listing/UsersListing';
import { EAppRoutes } from './routes';

export const router = createBrowserRouter([
  {
    path: EAppRoutes.APP,
    element: <App />,
    loader: LoaderFullscreen,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: EAppRoutes.LOGIN,
        element: <Login />,
      },
      {
        id: breadcrumbRoutesId, // required for bradcrumb rendering
        element: <ProtectedRoutes />,
        children: [
          {
            path: EAppRoutes.SETTINGS,
            element: <Settings />,
          },
          {
            path: EAppRoutes.PROFILE,
            element: <Profile />,
          },
          {
            path: EAppRoutes.DASHBOARD,
            element: <Dashboard />,
          },
          {
            path: EAppRoutes.MASTERS,
            element: <RouterRedirect from={EAppRoutes.MASTERS} to={EAppRoutes.MASTERS_HOME} />,
            children: [
              {
                path: EAppRoutes.MASTERS_HOME,
                element: <Masters />,
              },
              {
                path: EAppRoutes.USERS,
                element: <RouterRedirect from={EAppRoutes.USERS} to={EAppRoutes.USERS_LIST} />,
                children: [
                  {
                    path: EAppRoutes.USERS_LIST,
                    element: <UsersListing />,
                  },
                  {
                    path: EAppRoutes.USERS_CREATE,
                    element: <UserForm />,
                  },
                  {
                    path: EAppRoutes.USERS_UPDATE,
                    element: <UserForm />,
                  },
                ],
              },
              {
                path: EAppRoutes.CUSTOMERS,
                element: <Customers />,
              },
              {
                path: EAppRoutes.AGENTS,
                element: <Agents />,
              },
              {
                path: EAppRoutes.INVOICE_CATEGORIES,
                element: <InvoiceCategories />,
              },
              {
                path: EAppRoutes.TRANSACTION_TYPES,
                element: <TransactionTypes />,
              },
            ],
          },
          {
            path: EAppRoutes.INVOICES,
            element: <Invoices />,
          },
          {
            path: EAppRoutes.TRANSACTIONS,
            element: <Transactions />,
          },
          {
            path: EAppRoutes.REPORTS,
            element: <Outlet />,
            children: [
              {
                path: EAppRoutes.REPORTS_HOME,
                element: <Reports />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
