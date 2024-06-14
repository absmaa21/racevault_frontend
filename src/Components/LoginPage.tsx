import React, {useContext, useEffect, useState} from 'react';
import '../css/LoginPage.css'
import config from "../config";
import Logo from '../assets/logo.png'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";

function LoginPage() {
    const navigation = useNavigate()
    const User = useContext(UserContext)!;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const emailRegex = RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-Z]{2,}$')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!emailRegex.test(email)) {
            setErrorMessage('Invalid Email!')
            return;
        }

        try {
            const response = await fetch(config.backendUrl + '/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if (response.ok) {
                const data = await response.json();
                User.login(data._id, remember)
                console.log('Login successful with: ', data._id)
                navigation('/')
                return;
            }

            const r = await response.json()
            setErrorMessage(r.error)
            console.error('something went wrong: ', response)
        } catch (error) {
            console.error('login failed', error);
            setErrorMessage('Something went wrong.')
        }
    };

    useEffect(() => {
        setErrorMessage('')
    }, [email, password]);

    return (
        <div className="container vh-100 align-content-center">
            <div className="row justify-content-center">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image align-content-center">
                                    <img src={Logo} alt={'Logo'} className={'img-fluid'}/>
                                </div>
                                <div className="col-lg-6 p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Welcome back!</h1>
                                    </div>
                                    <form className="user" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control form-control-user"
                                                aria-describedby="emailHelp"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox"
                                                       className="custom-control-input"
                                                       id="customCheck"
                                                       checked={remember}
                                                       onChange={(e) => setRemember(e.target.checked)}/>
                                                <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                            </div>
                                        </div>
                                        <h3 className={'invalid-feedback d-block text-center'}
                                            style={{minHeight: 16}}>{errorMessage}</h3>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Login
                                        </button>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <button className="btn btn-link btn-sm" onClick={() => navigation('/register')}>
                                            Create new account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
