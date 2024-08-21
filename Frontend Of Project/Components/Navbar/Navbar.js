import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Basket } from '@phosphor-icons/react';
import Login from '../Login/Login'; // Login modal'ını import ediyoruz

function Navbar() {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/category');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Fetched Categories:', data);
            setCategories(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item"><Link className="navbar-link" to="/">Home</Link></li>
                <li className="navbar-item dropdown">
                    <span className="navbar-link">Kategoriler</span>
                    <ul className="dropdown-menu">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <li key={category.id} className="dropdown-item">
                                    <Link className="dropdown-link" to={`/category/${category.id}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="dropdown-item">No Categories Available</li>
                        )}
                    </ul>
                </li>
                <li className="navbar-item"><Link className="navbar-link" to="/customers">Müşteriler</Link></li>
                <li className="navbar-item" style={{ marginLeft: 'auto' }}>
                    <span className="navbar-link" onClick={openModal}>Giriş</span> {/* Giriş yazısına tıklama fonksiyonu ekliyoruz */}
                </li>
                <Link className="custom-icon-button-basket">
                    <Basket size={25} />
                </Link>
            </ul>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                       <h1>Giriş</h1>
                        <Login closeModal={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
