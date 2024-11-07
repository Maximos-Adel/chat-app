import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Chat from "../pages/Chat";
import MainLayout from "../layout/MainLayout";

export const routesList = [
  { path: "/", element: <Home /> },
  {
    element: <MainLayout />,
    children: [{ path: "chat", element: <Chat /> }],
  },
];

export const router = createBrowserRouter(routesList);
