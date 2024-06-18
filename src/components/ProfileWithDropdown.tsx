import React, {useContext, useState} from 'react';
import {UserContext} from "../contexts/UserContext";
import LogoutDialog from "./dialogs/LogoutDialog";
import {Dialog} from "@mui/material";

function ProfileWithDropdown() {
    const User = useContext(UserContext)
    const [collapsed, setCollapsed] = useState(true)
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)

    function toggleLogoutDialog() {
        setShowLogoutDialog(prev => !prev)
    }

    return (
        <div className={'d-flex flex-md-column dropdown'}>
        {!collapsed && (
                <div
                    className="dropdown-menu shadow animated--grow-in show mb-2 mx-md-2">
                    <button className="dropdown-item">
                        <i className="bi bi-person mr-2"></i>
                        Profile
                    </button>
                    <button className="dropdown-item">
                        <i className="bi bi-gear mr-2"></i>
                        Settings
                    </button>
                    <div className={'dropdown-divider'} />
                    <button className="dropdown-item" onClick={toggleLogoutDialog}>
                        <i className="bi bi-box-arrow-left mr-2"></i>
                        Logout
                    </button>
                </div>
            )}
            <button className={'btn shadow-none text-left btn-toolbar btn-hover pt-2 rounded-0 border-0 justify-content-center justify-content-md-start'}
                    onClick={() => setCollapsed(!collapsed)}>
                <img
                    className={'img-profile rounded-pill'}
                    width={40}
                    src={User?.user?.picture}
                    alt={'avatar'}
                />
                <h6 className={'text-white ml-2 d-flex flex-column'}>
                    {User?.user?.username}
                    <span
                        className={'small text-white-50'}>{User?.user?.num_of_races ?? 0} {User?.user?.num_of_races === 1 ? 'Race' : 'Races'}</span>
                </h6>
            </button>
            <Dialog open={showLogoutDialog} onClose={toggleLogoutDialog} classes={{paper: 'rounded-5'}}>
                <LogoutDialog toggleLogout={toggleLogoutDialog}/>
            </Dialog>
        </div>
    );
}

export default ProfileWithDropdown;
