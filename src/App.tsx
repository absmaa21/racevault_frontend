import React from 'react';
import './App.css';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import OverviewPage from "./Components/OverviewPage";
import Layout from "./Components/Layout";
import InputPage from "./Components/InputPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/overview" element={<OverviewPage/>}/>
                    <Route path="/input" element={<InputPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
