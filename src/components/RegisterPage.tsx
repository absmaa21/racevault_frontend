import React, {useEffect, useState} from 'react';
import '../css/LoginPage.css'
import config from "../config";
import Logo from '../assets/logo.png'
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const navigation = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
        picture: '',
    })
    const [errorMessage, setErrorMessage] = useState('');
    const emailRegex = RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-z0-9.-]+\\.[a-zA-Z]{2,}$')

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!emailRegex.test(form.email)) {
            setErrorMessage('Invalid Email!')
            return;
        }

        let usernameToInsert = form.username;
        if (form.username.length <= 0) {
            usernameToInsert = form.email.substring(0, form.email.indexOf('@'));
        }

        let pictureToInsert = form.picture;
        if (form.picture.length <= 0) {
            pictureToInsert = 'https://ui-avatars.com/api/?name=' + usernameToInsert;
        }

        try {
            console.log('registering with email:', form.email, 'and password:', form.password);
            const response = await fetch(config.backendUrl + '/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password,
                    username: usernameToInsert,
                    picture: pictureToInsert
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Register successful', data);
                navigation('/login')
                return;
            }

            const r = await response.json()
            setErrorMessage(r.error)
            console.error('something went wrong: ', response)
        } catch (error) {
            console.error('registering failed', error);
            setErrorMessage('Something went wrong.')
        }
    };

    useEffect(() => {
        setErrorMessage('')
    }, [form]);

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
                                        <h1 className="h4 text-gray-900 mb-4">Create a free account!</h1>
                                    </div>
                                    <form className="user" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-user"
                                                aria-describedby="emailHelp"
                                                placeholder="Email address*"
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
                                                placeholder="Password*"
                                                value={form.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <hr/>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name='username'
                                                className="form-control form-control-user"
                                                placeholder="Username"
                                                value={form.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="url"
                                                name='picture'
                                                className="form-control form-control-user"
                                                placeholder="Profile picture as link"
                                                value={form.picture}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <h3 className={'invalid-feedback d-block text-center'}
                                            style={{minHeight: 16}}>{errorMessage}</h3>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            Register
                                        </button>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <button className="btn btn-link btn-sm" onClick={() => navigation('/login')}>
                                            Log in existing account
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

export default RegisterPage;
