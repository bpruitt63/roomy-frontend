import {useState, useCallback} from 'react';

function useHandleChange(initialState={}) {
    const [data, setData] = useState(initialState);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData(d => ({
            ...d,
            [name]: value
        }));
    };
    return [data, handleChange, setData];
};

function useErrors() {
    const [apiErrors, setApiErrors] = useState({});

    const getApiErrors = useCallback(e => {
        const errors = {...e};
        setApiErrors(errors);
    }, [setApiErrors]);
    return [apiErrors, getApiErrors, setApiErrors];
};

function useValidate() {
    const [formErrors, setFormErrors] = useState({});

    /** Sets state to object with all form errors.
     */
    function validate(data, required={}) {
        const err = {};

        for (let property of Object.keys(required)) {
            if (!data[property]) {
                err[property] = `${required[property]} is required`;
            } else {
                delete(err[property]);
            };
        };

        if (data.email && !data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            err.emailFormat = "Must be valid email address";
        } else {
            delete(err.emailFormat);
        };
        if (data.email && (data.email.length < 6 || data.email.length > 60)) {
            err.emailLength = "Email must be between 6 and 60 characters";
        } else {
            delete(err.emailLength);
        };
        if (data.pwd && (data.pwd.length < 6 || data.pwd.length > 20)) {
            err.pwdLength = "Password must be between 6 and 20 characters";
        } else {
            delete(err.pwdLength);
        };
        if ('pwd2' in data && (data.pwd !== data.pwd2)){
            err.pwdsMatch = "Passwords must match";
        } else {
            delete(err.pwdsMatch);
        };
        if (data.firstName && data.firstName.length > 30){
            err.firstNameLength = "First name cannot exceed 30 characters";
        } else {
            delete(err.firstNameLength);
        };
        if (data.lastName && data.lastName.length > 30){
            err.lastNameLength = "Last name cannot exceed 30 characters";
        } else {
            delete(err.lastNameLength);
        };

        setFormErrors(err);
        return err;
    };
    return [formErrors, validate];
};

export {useHandleChange, useErrors, useValidate};