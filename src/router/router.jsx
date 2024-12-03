import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/pages/dashboard/Index";
import Compare from "../components/pages/compare/Index";
import Rank from '../components/pages/rank/Index';
import Layout from './Layout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path : '/',
                element : <Dashboard />
            },
            {
                path : '/rank',
                element : <Rank />
            },
            {
                path : '/compare',
                element : <Compare />
            }
        ]
    }
]);

export default router;