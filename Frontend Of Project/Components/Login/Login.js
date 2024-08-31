import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Login/Login.css";
import Register from '../Register/Register'; // Import the Register component

function Login({ closeModal, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (response.ok) {
                if (data.accessToken && data.role && data.userId,data.userName,data.userSurname,data.userEmail) {
                    localStorage.setItem('token', data.accessToken);
                    localStorage.setItem('role', data.role);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('userName',data.userName);
                    localStorage.setItem('userSurname',data.userSurname);
                    localStorage.setItem('userEmail',data.userEmail);

                    if (onLoginSuccess) onLoginSuccess();

                    navigate(data.role.includes("ADMIN") ? '/admin' : '/');
                    closeModal();
                } else {
                    alert('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
                }
            } else {
                alert('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('Bir hata oluştu! Lütfen tekrar deneyin.');
        }
    };

    const handleOpenRegister = () => {
        setIsRegisterOpen(true);
    };

    const handleCloseRegister = () => {
        setIsRegisterOpen(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                    required
                />
                <p>
                    Hesabınız yok mu? 
                    <br/>
                    <button type="button" onClick={handleOpenRegister} className="register-button"> Kayıt Ol</button>
                </p>
                <button type="submit" className="myButton">Giriş Yap</button>
            </form>
            {isRegisterOpen && (
                <Register onClose={handleCloseRegister} />
            )}
        </div>
    );
}

export default Login;
