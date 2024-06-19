import React from 'react';
import './App.css';
import '../node_modules/startbootstrap-sb-admin-2/css/sb-admin-2.css'
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import OverviewPage from "./components/OverviewPage";
import Layout from "./components/Layout";
import InputPage from "./components/InputPage";
import {UserProvider} from "./contexts/UserContext";
import ShowRacesPage from "./components/ShowRacesPage";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/" element={<OverviewPage/>}/>
                        <Route path="/input" element={<InputPage/>}/>
                        <Route path="/races" element={<ShowRacesPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
