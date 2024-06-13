import React, {useState} from 'react';
import '../css/LoginPage.css'
import config from "../config";

function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    var backendAddresse = config.backendUrl;

    const handleLogin = async () => {
        try {
            console.log('registering with email:', email, 'and password:', password);
            const response = await fetch(backendAddresse + '/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful', data);
                // Redirect to another page or perform any action upon successful login
            } else {
                console.error('registering failed', response.statusText);
            }
        } catch (error) {
            console.error('registering failed', error);
            // Handle error cases
        }
    };
        return (
            <div className={"login-container"}>
                <div className="login-box">
                    <label>Username</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className="button-container">
                        <button onClick={handleLogin}>submit</button>
                    </div>
                </div>

            </div>
        );
}

export default RegisterPage;
