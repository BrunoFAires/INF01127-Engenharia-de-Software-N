import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";

function App() {
    const navigate = useNavigate()
/*    useEffect(() => {
        getCurrentUser().then(user => {
            console.log(user)
            if (user) {
                navigate('/')
            } else {
                navigate('/signUp')
            }
        })
        // supabase.auth.onAuthStateChange((_event, session) => {
        //     if (session) {
        //         navigate('/home', {replace: true})
        //     } else {
        //         console.log("no user");
        //         navigate('/signin', {replace: true})
        //     }
        // });
    }, []);*/

    return <Routes>
        <Route
            key=''
            path='/signUp'
            exact
            element={<SignUp/>}
        />
        <Route
            key=''
            path='/signIn'
            exact
            element={<SignIn/>}
        />
    </Routes>
}

export default App;
