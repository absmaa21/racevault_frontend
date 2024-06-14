import React, {useContext, useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import NavItem from "./NavItem";
import Logo from '../assets/logo-wide.svg'
import '../css/sb-admin-2.css'
import {UserContext} from "../contexts/UserContext";

function Layout() {
    const navigation = useNavigate()
    const {UserID, Login, Logout} = useContext(UserContext)!

    const location = useLocation();
    const noLayoutRoutes = ['/login', '/register'];
    const showLayout = !noLayoutRoutes.includes(location.pathname);

    useEffect(() => {
        if(!UserID) {
            if(showLayout) navigation('/login')
            return;
        }
        if(showLayout) return;
        navigation('/')
    }, [UserID, navigation, showLayout]);

    return (
        <div className={'d-flex'}>
            {showLayout && (
                <ul className={'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'}>
                    <a className={'sidebar-brand'} href={'/'}>
                        <img
                            width={160}
                            src={Logo}
                            alt={'Logo'}
                        />
                    </a>
                    <hr className={'sidebar-divider my-0'}/>
                    <NavItem path={'/'} title={'Dashboard'} index/>
                    <hr className={'sidebar-divider'}/>
                    <NavItem path={'/input'} title={'Input'}/>
                    <NavItem path={'/races'} title={'Races'}/>
                </ul>
            )}
            <div className={'d-flex flex-fill bg-gradient-dark'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
