// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Optional: Create a shared Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation (frontend)
        if (!username || !email || !password) {
            alert('Please fill all fields.');
            return;
        }

        try {
            // Send POST request to backend
            const res = await api.post('/auth/register', {
                username,
                email,
                password
            });

            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            // Show backend error if exists
            console.error(err.response?.data);
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        }}>
            <form 
                onSubmit={handleSubmit} 
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: '20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    width: '300px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Sign Up</h2>

                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    required
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <button 
                    type="submit"
                    style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;