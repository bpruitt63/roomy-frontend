import React from 'react';
import {useHandleChange} from './hooks';

function Login() {

    const initialState = {email: '', pwd: ''};
    const [data, handleChange, setData] = useHandleChange(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({...data, pwd: ''});
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='text'
                    name='email'
                    id='loginEmail'
                    value={data.email}
                    placeholder='Email'
                    onChange={handleChange} />
            <input type='password'
                    name='pwd'
                    id='loginPwd'
                    value={data.pwd}
                    placeholder='Password'
                    onChange={handleChange} />
            <button type='submit'>Login</button>
        </form>
    );
};

export default Login;