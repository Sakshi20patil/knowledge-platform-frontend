import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.error || err.message);
        }
    };

    return (
        <div className="small-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;