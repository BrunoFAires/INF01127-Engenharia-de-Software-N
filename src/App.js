import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute";
import React, {useEffect, useState} from "react";
import {Home} from "./pages/Home";
import {Decks} from "./pages/Decks";
import {Deck} from "./pages/Deck";
import {getCurrentUser} from "./service/authService";

function App() {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then(user => {
            setCurrentUser(user)
        }).finally(_ => {
            setLoading(false)
        })

    }, []);

    return loading ? <></> : <BrowserRouter>
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
        </Routes>
    </BrowserRouter>
}

export default App;
