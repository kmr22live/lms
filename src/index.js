import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "./components/context/Provider";
import "./index.css";
import "./assets/books.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Bookscards from "./components/Bookcards";
import Settings from "./components/Settings";
import AddBook from "./components/formsSettings/AddBook";
import ViewMembers from "./components/members/ViewMembers";
import AddMembers from "./components/members/AddMembers";
import "react-toastify/dist/ReactToastify.css";
import BookIssue from "./components/BookIssue";

const root = ReactDOM.createRoot(document.getElementById("root"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" replace={true} />,
      },
      {
        path: "/bookcard",
        element: <Bookscards />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/removebook",
        element: <AddBook />,
      },
      {
        path: "/viewmembers",
        element: <ViewMembers />,
      },
      {
        path: "/addmembers",
        element: <AddMembers />,
      },
      {
        path: "/removemembers",
        element: <AddMembers />,
      },
      {
        path: "/bookissue/:id",
        element: <BookIssue />,
      },
    ],
  },
]);
root.render(
  <Provider>
    <React.StrictMode>
      <RouterProvider router={appRouter} />
    </React.StrictMode>
  </Provider>
);
