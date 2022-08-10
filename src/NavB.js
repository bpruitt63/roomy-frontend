import React from 'react';
import {Link} from 'react-router-dom';

function NavB({user}) {

    return (
        <div>
            <p>
                <Link to='/'>Roomy</Link>
                {!user && 
                    <Link to='/login'>Login/Register</Link>}
                {user &&
                    <span>{user.firstName}{' '}{user.lastName}</span>}
                {user && <Link to='/logout'>Logout</Link>}
                <span>Admin</span>
            </p>
        </div>
    );
};

export default NavB;