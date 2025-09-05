import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import ErrorPage from "../Pages/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import AllArtifacts from "../Pages/AllArtifacts/AllArtifacts";
import ArtifactDetails from "../Pages/ArtifactDetails/ArtifactDetails";
import AddArtifact from "../Pages/AddArtifact/AddArtifact";
import Auth from "../Pages/Auth/Auth";
import SignIn from "../Pages/Auth/SignIn";
import Register from "../Pages/Auth/Register";
import MyArtifacts from "../Pages/MyArtifacts/MyArtifacts";
import LikedArtifact from "../Pages/LikedArtifact/LikedArtrfact";
import UpdateArtifact from "../Pages/UpdateArtifact/UpdateArtifact";
import PrivateRoute from "../AuthProvider/PrivateRoute";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home />,
        path: "/",
      },
      {
        path: "/allartifacts",
        element: <AllArtifacts />,
      },
      {
        path: "/details/:id",
        element: <ArtifactDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allartifacts/${params.id}`),
      },
      {
        path: "/addartifact",
        element: (
          <PrivateRoute>
            <AddArtifact />
          </PrivateRoute>
        ),
      },
      {
        path: "/myartifacts",
        element: (
          <PrivateRoute>
            <MyArtifacts />
          </PrivateRoute>
        ),
      },
      {
        path: "/liked",
        element: (
          <PrivateRoute>
            <LikedArtifact />
          </PrivateRoute>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateArtifact />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allartifacts/${params.id}`),
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/signin",
        element: <SignIn />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);
