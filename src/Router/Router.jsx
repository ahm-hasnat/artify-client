import React from 'react';
import { createBrowserRouter } from "react-router";
import Root from '../Layouts/Root';
import ErrorPage from '../Pages/Error/ErrorPage';
import Home from '../Pages/Home/Home';



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
              }
            ]
        },
    ]);
   


