import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import UserForm from './UserForm';

function AppRoutes({user, handleToken, setUser}) {

    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login user={user}
                                                handleToken={handleToken} />} />
            <Route path='/logout' element={<Logout setUser={setUser} />} />
            <Route path='/register' element={<UserForm formPurpose={{purpose: 'register', target: 'self'}}
                                                        user={user}
                                                        handleToken={handleToken} />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
};

export default AppRoutes;