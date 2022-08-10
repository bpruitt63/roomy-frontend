import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import RoomyApi from './RoomyApi';

function Logout({setUser}) {

    useEffect(() => {
        localStorage.removeItem('roomyToken');
        RoomyApi.token = '';
        setUser(null);
    }, [setUser]);

    return (<Navigate to='/' />);
};

export default Logout;