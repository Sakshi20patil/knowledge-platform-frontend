import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login'); // redirect if not logged in
        } else {
            fetchArticles();
        }
        // eslint-disable-next-line
    }, []);

    // Fetch logged-in user's articles
    const fetchArticles = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await api.get('/articles/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(res.data);
        } catch (err) {
            console.error('Error fetching user articles:', err.response?.data || err.message);
        }
    };

    // Delete article
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        try {
            const token = localStorage.getItem('token');
            await api.delete(`/articles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchArticles(); // refresh list after deletion
        } catch (err) {
            console.error('Error deleting article:', err.response?.data || err.message);
        }
    };

    return (
        <div className="container">
            <h2>My Articles</h2>
            {articles.length === 0 && <p>No articles found. Create one!</p>}
            {articles.map(a => (
                <div key={a.id} className="card" style={{ margin: '10px 0', padding: '10px' }}>
                    <h3>{a.title}</h3>
                    <p>Category: {a.category || 'N/A'}</p>
                    <p>Tags: {a.tags && a.tags.length > 0 ? a.tags.map(t => t.name).join(', ') : 'None'}</p>
                    <Link to={`/create/${a.id}`} style={{ marginRight: '10px' }}>Edit</Link>
                    <button onClick={() => handleDelete(a.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;