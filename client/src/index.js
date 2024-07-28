import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, CreateBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Main from './components/Main';
import PreHome from './components/Prehome';

const MyApp = () => {
    return (
        <div className="">

        </div>


    );
};

const App = createBrowserRouter([
    {
        path: "/",
        element: <PreHome />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/home/main",
        element: <Main />
    },
    {

    }

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={App} />);


