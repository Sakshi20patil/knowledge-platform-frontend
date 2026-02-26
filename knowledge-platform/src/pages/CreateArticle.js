import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const CreateArticle = () => {
    const { id } = useParams(); // For edit
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => { if (id) fetchArticle(); }, [id]);

    const fetchArticle = async () => {
        const res = await api.get(`/articles/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category);
        setTags(res.data.tags.map(t => t.name).join(','));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { title, content, category, tags: tags.split(',') };
        if (id) {
            await api.put(`/articles/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            await api.post('/articles', payload, { headers: { Authorization: `Bearer ${token}` } });
        }
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{id ? 'Edit' : 'Create'} Article</h2>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br/>
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} /><br/>
            <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} /><br/>
            <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} /><br/>
            <button type="submit">{id ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default CreateArticle;