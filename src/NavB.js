import React from 'react';
import {Link} from 'react-router-dom';

function NavB() {

    return (
        <div>
            <p>
                <Link to='/'>Roomy</Link>
                <Link to='/login'>Login Stuff</Link>
                <span>Admin</span>
            </p>
        </div>
    );
};

export default NavB;