import React from 'react';

function Header(props: any) {
    return (
        <div className={'nav navbar shadow-sm justify-content-between'}>
            {props.children}
            <p>asd</p>
        </div>
    );
}

export default Header;
