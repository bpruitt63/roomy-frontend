import {useState} from 'react';

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

export {useHandleChange};