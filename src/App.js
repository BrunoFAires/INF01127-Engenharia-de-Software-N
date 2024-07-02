import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import React from "react";
import {Home} from "./pages/Home";
import {Decks} from "./pages/Decks";
import {NewDeck} from "./pages/NewDeck";

function App() {

    const router = createBrowserRouter([
        {path: "/", element: <ProtectedRoute component={Home}/>},
        {path: "/signUp", element: <SignUp/>},
        {path: "/signin", element: <SignIn/>},
        {path: "/decks", element: <Decks/>},
        {path: "/newDeck", element: <NewDeck/>},
    ]);

    return <RouterProvider router={router}/>
}

export default App;
