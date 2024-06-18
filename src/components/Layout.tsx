import React, {useContext, useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import NavItem from "./NavItem";
import Logo from '../assets/logo-wide-light.svg'
import LogoSmall from '../assets/logo-notext.svg'
import '../css/Layout.css'
import {UserContext} from "../contexts/UserContext";
import ProfileWithDropdown from "./ProfileWithDropdown";

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
                <ul className={'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion justify-content-between'}
                    id={'accordionSidebar'}>
                    <div>
                        <button className={'d-flex btn py-4 w-100 justify-content-center'}
                                onClick={() => navigation('/')}>
                            <img
                                className={'d-none d-md-flex'}
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
                        <NavItem path={'/racesTable'} title={'Races'} icon={'bi-table'}/>
                    </div>

                    <ProfileWithDropdown />
                </ul>
            )}
            <div className={'d-flex flex-fill bg-gradient-dark'}>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;
