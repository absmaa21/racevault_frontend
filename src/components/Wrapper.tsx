import React from 'react';

function Wrapper(props: any) {
    return (
        <div>
            {props.children}
        </div>
    );
}

export default Wrapper;
