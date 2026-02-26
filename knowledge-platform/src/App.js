import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreateArticle from './pages/CreateArticle';
import Dashboard from './pages/Dashboard';
import ArticleDetails from './pages/ArticleDetails';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreateArticle />} />
                <Route path="/create/:id" element={<CreateArticle />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/articles/:id" element={<ArticleDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;