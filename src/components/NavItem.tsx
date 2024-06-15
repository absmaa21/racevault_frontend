import React from 'react';
import {NavLink} from "react-router-dom";

interface INavItem {
    path: string,
    title: string,
    index?: boolean,
    icon?: string,
}

function NavItem(props: INavItem) {
    let classStr = 'nav-item';
    if (!props.index) classStr += window.location.href.includes(props.path) ? ' active' : ''
    else classStr += window.location.href === 'http://localhost:3000/' ? ' active' : ''

    let iconClassStr = 'bi mx-2 ' + props.icon ?? ''

    return (
        <li className={classStr}>
            <NavLink
                className={'nav-link'}
                to={props.path}
            >
                <i className={iconClassStr}></i>
                <span>{props.title}</span>
            </NavLink>
        </li>
    );
}

export default NavItem;
