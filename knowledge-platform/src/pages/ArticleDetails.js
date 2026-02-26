import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await api.get(`/articles/${id}`);
                setArticle(res.data);
            } catch (err) {
                alert(err.response?.data?.error || err.message);
            }
        };
        fetchArticle();
    }, [id]);

    if (!article) return <p>Loading...</p>;

    return (
        <div>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Author: {article.author.username}</p>
            <p>Category: {article.category}</p>
            <p>Tags: {article.tags.map(t => t.name).join(', ')}</p>
        </div>
    );
};

export default ArticleDetails;