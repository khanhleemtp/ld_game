import React, { useState } from 'react'
import { LogPage } from './LogPage'
import { useDispatch } from 'react-redux'
import { register } from '../redux/actions/authAction';

export const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const registerResource = {
        username,
        setUsername,
        name,
        setName,
        password,
        setPassword,
    }
    
    const onRegister = (e) => {
            e.preventDefault();
            dispatch(register({ name, username, password }));
        }
    return (
        <LogPage 
            registerResource={registerResource}
            onRegister={onRegister}
        />
    )
}
