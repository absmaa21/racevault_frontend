import React from 'react';
import {NavLink} from "react-router-dom";

interface INavItem {
    path: string,
    title: string,
    index?: boolean
}

function NavItem(props: INavItem) {
    let classStr = 'nav-item';
    if (!props.index) classStr += window.location.href.includes(props.path) ? ' active' : ''
    else classStr += window.location.href === 'http://localhost:3000/' ? ' active' : ''

    return (
        <li className={classStr}>
            <NavLink
                className={'nav-link'}
                to={props.path}
            >{props.title}</NavLink>
        </li>
    );
}

export default NavItem;
