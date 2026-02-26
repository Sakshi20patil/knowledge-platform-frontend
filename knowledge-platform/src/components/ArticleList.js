// src/components/ArticleList.js
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import ArticleCard from './ArticleCard';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    // Fetch articles from backend
    const fetchArticles = async () => {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;

        try {
            const res = await api.get('/articles', { params });
            setArticles(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchArticles();
    };

    return (
        <div style={{ marginTop: '10px' }}>
            {/* Compact search form top-right */}
            <form onSubmit={handleSearch} style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '5px',
                marginBottom: '15px'
            }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        padding: '5px',
                        width: '120px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{
                        padding: '5px',
                        width: '100px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '5px 10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: 'pointer'
                    }}
                >
                    Go
                </button>
            </form>

            {/* Display articles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {articles.map(a => (
                    <ArticleCard key={a.id} article={a} />
                ))}
            </div>
        </div>
    );
};

export default ArticleList;