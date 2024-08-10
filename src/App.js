import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { useAuthHook } from "./hooks/useAuthHook";
import { Deck } from "./pages/Deck";
import { Decks } from "./pages/Decks";
import { Home } from "./pages/Home";
import { Logout } from "./pages/Logout";
import { Order } from "./pages/Order";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

function App() {
    const {loading, currentUser} = useAuthHook();

    return loading ? <></> : <HashRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute user={currentUser}>
                        <Home/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/decks"
                element={
                    <ProtectedRoute user={currentUser}>
                        <Decks currentUser={currentUser}/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/deck"
                element={
                    <ProtectedRoute user={currentUser}>
                        <Deck currentUser={currentUser}/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <ProtectedRoute user={currentUser}>
                        <Order currentUser={currentUser}/>
                    </ProtectedRoute>
                }
            />
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route
                path="/logout"
                element={
                    <Logout />
                }
            />
        </Routes>
    </HashRouter>
}

export default App;
