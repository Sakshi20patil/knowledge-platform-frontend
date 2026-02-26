import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => (
    <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px',
        background: 'white',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    }}>
        <div className="card">
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
        </div>
    </div>
);


export default ArticleCard;