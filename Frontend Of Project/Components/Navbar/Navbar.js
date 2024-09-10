import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { Basket } from '@phosphor-icons/react';
import Login from '../Login/Login';
import Logo from '../logo.png';

function Navbar() {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
        checkAuthStatus();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/category');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token) {
            setIsLoggedIn(true);
            if (role && role.includes('ADMIN')) {
                setIsAdmin(true);
            }
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <div className="navbar">
            <ul className="navbar-list">
                {!isAdmin && (
                    <li className="navbar-item">
                        <Link className="navbar-link" to="/">Anasayfa</Link>
                    </li>
                )}
                {isAdmin && (
                    <>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/customers">Müşteriler</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="/product_admin">Ürünler</Link>
                        </li>
                    </>
                )}
                {!isAdmin && (
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
                )}
                <div className="navbar-item-container" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                    {isLoggedIn && (
                        <li className="navbar-item dropdown">
                            <span className="navbar-link">Profil</span>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item">
                                    <Link className="dropdown-link" to={`/customer-profile`}>
                                        Hesabım
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    {isLoggedIn ? (
                        <li className="navbar-item">
                            <span className="navbar-link" onClick={logout}>Çıkış</span>
                        </li>
                    ) : (
                        <li className="navbar-item">
                            <span className="navbar-link" onClick={openModal}>Giriş</span>
                        </li>
                        
                    )}
                    {isLoggedIn && !isAdmin &&(
                        <li className="navbar-item">
                        <Link className="custom-icon-button-basket" to="/basket">
                            <Basket size={25} />
                        </Link>
                    </li>
                    )}                  
                </div>
            </ul>
    
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h1>Giriş</h1>
                        <Login closeModal={closeModal} onLoginSuccess={() => checkAuthStatus()} />
                    </div>
                </div>
            )}
        </div>
    );
    
}

export default Navbar;
