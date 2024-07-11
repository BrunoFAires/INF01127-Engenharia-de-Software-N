import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import React from "react";
import {Home} from "./pages/Home";
import {Decks} from "./pages/Decks";
import {Deck} from "./pages/Deck";
import {Logout} from "./pages/Logout";
import {useAuthHook} from "./hooks/useAuthHook";

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
