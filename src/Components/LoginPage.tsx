import React, {useEffect} from 'react';
import '../css/LoginPage.css';
import logo from '../assets/logo_light.png'
import discordLogo from '../assets/discord.svg'

function LoginPage() {
    useEffect(() => {
        fetch('http://localhost:3001')
            .then(r => r.json())
            .then(data => {
                if(data.loggedIn) {
                    window.location.href = data.redirectUrl
                }
            })
    }, [])

    return (
        <div className="bg-dark vh-100 text-center bg-gradient">
            <img className={'h-50'} src={logo} alt={'logo'}/>

            <h2 className={'text-white mb-4'}>Login with</h2>

            <a className={'btn btn-primary rounded-3'} style={{width: 256}} href={'http://localhost:3001/auth'}>
                <img
                    className={'card-img'}
                    src={discordLogo}
                    alt={'discord logo'}
                />
            </a>
        </div>
    );
}

export default LoginPage;
