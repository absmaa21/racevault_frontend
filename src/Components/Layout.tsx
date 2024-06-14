import React, {useContext, useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import NavItem from "./NavItem";
import Logo from '../assets/logo-wide-light.svg'
import LogoSmall from '../assets/logo-notext.svg'
import '../css/sb-admin-2.css'
import {UserContext} from "../contexts/UserContext";

function Layout() {
    const navigation = useNavigate()
    const User = useContext(UserContext)!

    const location = useLocation();
    const noLayoutRoutes = ['/login', '/register'];
    const showLayout = !noLayoutRoutes.includes(location.pathname);

    useEffect(() => {
        if(!User.user) {
            if(showLayout) navigation('/login')
            return;
        }
        if(showLayout) return;
        navigation('/')
    }, [User, navigation, showLayout]);

    return (
        <div className={'d-flex'}>
            {showLayout && (
                <ul className={'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'} id={'accordionSidebar'}>
                    <button className={'btn py-4'} onClick={() => navigation('/')}>
                        <img
                            className={'d-none d-md-inline-flex'}
                            width={160}
                            src={Logo}
                            alt={'Logo'}
                        />
                        <img
                            className={'d-inline-flex d-md-none'}
                            width={40}
                            src={LogoSmall}
                            alt={'Logo'}
                        />
                    </button>
                    <hr className={'sidebar-divider my-0'}/>
                    <NavItem path={'/'} title={'Dashboard'} icon={'bi-speedometer'} index/>
                    <hr className={'sidebar-divider'}/>
                    <div className={'sidebar-heading'}>Races</div>
                    <NavItem path={'/input'} title={'Input'} icon={'bi-car-front-fill'}/>
                    <NavItem path={'/races'} title={'Races'} icon={'bi-table'}/>
                </ul>
            )}
            <div className={'d-flex flex-fill bg-gradient-dark'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
