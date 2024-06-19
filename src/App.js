import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import React from "react";
import {Home} from "./pages/Home";

function App() {

    const router = createBrowserRouter([
        {path: "/", element: <ProtectedRoute component={Home}/>},
        {path: "/signUp", element: <SignUp/>},
        {path: "/signin", element: <SignIn/>},
    ]);

    return <RouterProvider router={router}/>
}

export default App;
