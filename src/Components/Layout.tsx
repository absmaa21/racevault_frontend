import React from 'react';
import {Link, Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/Overview'}>Overview</Link>
                <Link to={'/input'}>Input</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default Layout;
