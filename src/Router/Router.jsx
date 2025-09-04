import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Layouts/Root';
import ErrorPage from '../Pages/Error/ErrorPage';
import Home from '../Pages/Home/Home';
import AllArtifacts from '../Pages/AllArtifacts/AllArtifacts';
import ArtifactDetails from '../Pages/ArtifactDetails/ArtifactDetails';



   export const Router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
              {
                index: true,
                element : <Home />,
                path : '/',
              },
             {
               path: "/allartifacts",
               element: <AllArtifacts />,
               loader: () => fetch('http://localhost:3000/allartifacts'),
             },{
              path : '/details/:id',
              element: <ArtifactDetails />,
              loader: ({ params }) => fetch(`http://localhost:3000/allartifacts/${params.id}`)
             }
            ]
        },
    ]);
   


