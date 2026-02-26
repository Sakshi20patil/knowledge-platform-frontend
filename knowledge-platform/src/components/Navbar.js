import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isLoggedIn = token && token !== 'undefined' && token !== 'null';

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={{
            padding: '12px 20px',
            background: '#007bff',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <Link to="/" style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', marginRight: '20px' }}>Knowledge Platform</Link>
                {isLoggedIn && <Link to="/create" style={{ marginRight: '15px', color: 'white' }}>New Article</Link>}
                {isLoggedIn && <Link to="/dashboard" style={{ marginRight: '15px', color: 'white' }}>My Articles</Link>}
            </div>
            <div>
                {!isLoggedIn && <Link to="/login" style={{ color: 'white', marginRight: '15px' }}>Login</Link>}
                {!isLoggedIn && <Link to="/register" style={{ color: 'white' }}>Signup</Link>}
                {isLoggedIn && <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>}
            </div>
        </nav>
    );
};

export default Navbar;