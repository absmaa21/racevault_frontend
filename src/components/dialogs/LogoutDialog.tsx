import React, {useContext} from 'react';
import {UserContext} from "../../contexts/UserContext";

interface Props {
    toggleLogout: () => void,
}

function LogoutDialog({toggleLogout}: Props) {
    const User = useContext(UserContext)

    function handleConfirm() {
        User?.logout()
        toggleLogout()
    }

    function handleCancel() {
        toggleLogout()
    }

    return (
        <div className={'bg-gradient-dark p-4 rounded-4'}>
            <h2 className={'text-white'}>Log out, are you sure?</h2>
            <div className={'d-flex modal-body justify-content-between'}>
                <button
                    className={'btn btn-primary'}
                    onClick={handleCancel}
                >Cancel</button>
                <button
                    className={'btn btn-dark'}
                    onClick={handleConfirm}
                >Yes</button>
            </div>
        </div>
    );
}

export default LogoutDialog;
