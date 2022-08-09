import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './Home';
import Login from './Login';

function AppRoutes({handleLogin}) {

    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login handleLogin={handleLogin} />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
};

export default AppRoutes;