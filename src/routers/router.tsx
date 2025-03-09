import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import UserManagamentPage from "../pages/UserManagamentPage";
import UserAnalyticsPage from "../pages/UserAnalyticsPage";

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      index: true,
      element: <Navigate to="/user-management" replace />
    },
    {
      path: "/user-management",
      element: <UserManagamentPage/>
    },
    {
      path: "analytics",
      element: <UserAnalyticsPage />
    }
  ]
}])

export default router;