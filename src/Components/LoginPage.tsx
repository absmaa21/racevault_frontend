import React, { useState } from 'react';
import '../css/LoginPage.css';
import {Link, useNavigate} from 'react-router-dom';
import config from "../config";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    var backendAddresse = config.backendUrl;

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            console.log('Logging in with email:', email, 'and password:', password);
            const response = await fetch(backendAddresse+'/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful', data);
                navigate('/overview', {state: {user: data}})
            } else {

                console.error('Login failed', response.statusText);
                setErrorMsg("Login failed")
            }
        } catch (error) {
            if (!(error instanceof Error)) return;
            console.error('Login failed', error);
            setErrorMsg(error.toString());
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <label>Username</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="button-container">
                    <button onClick={handleLogin}>Login</button>
                </div>
                <p className="register-text">Don't have an account? <Link to="/register">Register here</Link></p>
                {errorMsg.length > 0 && (<p>{errorMsg}</p>)}
            </div>
        </div>
    );
}

export default LoginPage;
