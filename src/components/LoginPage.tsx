import React, {useContext, useEffect, useState} from 'react';
import '../css/LoginPage.css'
import config from "../config";
import Logo from '../assets/logo.png'
import {useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/UserContext";

function LoginPage() {
    const navigation = useNavigate()
    const User = useContext(UserContext)!;

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: true,
    })
    const [errorMessage, setErrorMessage] = useState('');

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const emailRegex = RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-Z]{2,}$')

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!emailRegex.test(form.email)) {
            setErrorMessage('Invalid Email!')
            return;
        }

        try {
            const response = await fetch(config.backendUrl + '/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: form.email, password: form.password})
            });

            console.log(response.status)
            if (response.ok) {
                const data = await response.json();
                User.login(data, form.remember)
                console.log('Login successful with: ', data.id)
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
    }, [form.email, form.password]);

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
                                                name="email"
                                                className="form-control form-control-user"
                                                aria-describedby="emailHelp"
                                                placeholder="Email address"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-2">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control form-control-user"
                                                placeholder="Password"
                                                value={form.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox"
                                                       name="remember"
                                                       className="custom-control-input"
                                                       id="customCheck"
                                                       checked={form.remember}
                                                       onChange={(e) => setForm((prev) => ({
                                                           ...prev,
                                                           remember: e.target.checked
                                                       }))}/>
                                                <label className="custom-control-label" htmlFor="customCheck">Remember
                                                    Me</label>
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
