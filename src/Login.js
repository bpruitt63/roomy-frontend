import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useHandleChange, useErrors, useValidate} from './hooks';
import RoomyApi from './RoomyApi';
import Errors from './Errors';

function Login({handleLogin}) {

    const initialState = {email: '', pwd: ''};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [formErrors, validate] = useValidate();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});

        const err = validate(data, {email: 'Email', pwd: 'Password'});
        if (Object.keys(err).length) {
            setData({email: data.email, pwd: ''});
            return false;
        };

        setIsLoading(true);

        try {
            const token = await RoomyApi.login(data);
            handleLogin(token);
            navigate('/');
        } catch (err) {
            getApiErrors(err);
            setData({...data, pwd: ''});
            setIsLoading(false);
        };
    };

    if (isLoading) {
        return (
            <p>Loading...</p>
        );
    };

    return (
        <div>
            <Errors formErrors={formErrors}
                    apiErrors={apiErrors} />
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
        </div>
    );
};

export default Login;