import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useErrors, useHandleChange, useValidate} from './hooks';
import RoomyApi from './RoomyApi';
import Errors from './Errors';

function UserForm({formPurpose, user, targetEmail='', setUser=null, handleToken=null}) {

    /** formPurpose = {purpose: register || update, target: self || other} */

    const initialState = {email: '', pwd: '', pwd2: '', firstName: '',
                            lastName: '', superAdmin: false};

    const [data, handleChange, setData] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [formErrors, validate] = useValidate();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function setUpOrRedirect(targetEmail) {
            if (!user && (formPurpose.purpose === 'update' 
                    || formPurpose.target === 'other')) navigate('/');
            if (formPurpose.target === 'other' && !user?.superAdmin) navigate('/');
            if (formPurpose.purpose === 'update') {
                try {
                    const userInfo = targetEmail === user.email ? user 
                                : await RoomyApi.getUser(targetEmail);
                    setData({firstName: userInfo.firstName,
                        lastName: userInfo.lastName,
                        superAdmin: userInfo.superAdmin});
                } catch (err) {
                    getApiErrors(err);
                };
            };
        };
        setUpOrRedirect(targetEmail);
        setIsLoading(false);
    }, [formPurpose, targetEmail, setData, setIsLoading, getApiErrors, navigate, user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});

        const required = setRequired();
        const errors = validate(data, required);
        const dataMinusPasswords = {...data, pwd: '', pwd2: ''};
        if (Object.keys(errors).length) {
            setData(dataMinusPasswords);
            return false;
        };

        setIsLoading(true);
        delete data.pwd2;

        try {
            if (formPurpose.purpose === 'register' 
                && formPurpose.target === 'self') await register();
        } catch (err) {
            getApiErrors(err);
            setData(dataMinusPasswords);
            setIsLoading(false);
        };
    };

    const setRequired = () => {
        let required = {};
        if (formPurpose.purpose === 'register') {
            required = {email: 'Email', pwd: 'Password', pwd2: 'Retype Password',
                        firstName: 'First Name', lastName: 'Last Name'};
        };
        return required;
    };

    const register = async () => {
        const token = await RoomyApi.register(data);
        handleToken(token);
        navigate('/');
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
                {formPurpose.purpose === 'register' &&
                    <input type='text'
                            name='email'
                            id='loginEmail'
                            value={data.email}
                            placeholder='Email'
                            onChange={handleChange} />}
                <input type='password'
                        name='pwd'
                        id='userPwd'
                        value={data.pwd}
                        placeholder='Password'
                        onChange={handleChange} />
                <input type='password'
                        name='pwd2'
                        id='userPwd2'
                        value={data.pwd2}
                        placeholder='Retype Password'
                        onChange={handleChange} />
                <input type='text'
                        name='firstName'
                        id='firstName'
                        value={data.firstName}
                        placeholder='First Name'
                        onChange={handleChange} />
                <input type='text'
                        name='lastName'
                        id='lastName'
                        value={data.lastName}
                        placeholder='Last Name'
                        onChange={handleChange} />
                <button type='submit'>
                    {formPurpose.purpose[0].toUpperCase()}{formPurpose.purpose.substring(1)}
                </button>
            </form>
        </div>
    );
};

export default UserForm;