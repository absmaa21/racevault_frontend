import React, {useState} from 'react';
import '../css/LoginPage.css'
import config from "../config";
import Logo from '../assets/logo.png'
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    const navigation = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault()

        try {
            console.log('registering with email:', email, 'and password:', password);
            const response = await fetch(config.backendUrl + '/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Register successful', data);
                return;
            }

            console.error('something went wrong: ', response)
        } catch (error) {
            console.error('registering failed', error);
            // Handle error cases
        }
    };
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
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Create an free account!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Username"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <h3 className={'invalid-feedback d-block'}>{errorMessage}</h3>
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-user btn-block">
                                                Register
                                            </button>
                                        </form>
                                        <hr/>
                                        <div className="text-center">
                                            <a className="small" onClick={() => navigation('/login')}>Log in existing
                                                account.</a>
                                        </div>
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
