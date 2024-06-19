import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function OverviewPage() {
    const navigation = useNavigate()
    useEffect(() => {
        navigation('/races')
    }, []);
    return (
        <div className={''}>
            <h1>Dashboard</h1>
        </div>
    );
}

export default OverviewPage;
