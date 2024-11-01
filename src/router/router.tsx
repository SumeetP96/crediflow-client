import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from '../App';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import LoaderFullscreen from '../components/loader-fullscreen/LoaderFullscreen';
import ProtectedRoutes from '../components/protected-routes/ProtectedRoutes';
import RouterRedirect from '../components/router-redirect/RouterRedirect';
import { breadcrumbRoutesId } from '../helpers/constants';
import AgentForm from '../pages/agent-form/AgentForm';
import AgentsListing from '../pages/agents-listing/AgentsListing';
import CustomerForm from '../pages/customer-form/CustomerForm';
import CustomersListing from '../pages/customers-listing/CustomersListing';
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

              // Users
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

              // Customers
              {
                path: EAppRoutes.CUSTOMERS,
                element: (
                  <RouterRedirect from={EAppRoutes.CUSTOMERS} to={EAppRoutes.CUSTOMERS_LIST} />
                ),
                children: [
                  {
                    path: EAppRoutes.CUSTOMERS_LIST,
                    element: <CustomersListing />,
                  },
                  {
                    path: EAppRoutes.CUSTOMERS_CREATE,
                    element: <CustomerForm />,
                  },
                  {
                    path: EAppRoutes.CUSTOMERS_UPDATE,
                    element: <CustomerForm />,
                  },
                ],
              },

              // Agents
              {
                path: EAppRoutes.AGENTS,
                element: <RouterRedirect from={EAppRoutes.AGENTS} to={EAppRoutes.AGENTS_LIST} />,
                children: [
                  {
                    path: EAppRoutes.AGENTS_LIST,
                    element: <AgentsListing />,
                  },
                  {
                    path: EAppRoutes.AGENTS_CREATE,
                    element: <AgentForm />,
                  },
                  {
                    path: EAppRoutes.AGENTS_UPDATE,
                    element: <AgentForm />,
                  },
                ],
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
