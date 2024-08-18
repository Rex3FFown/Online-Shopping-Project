import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ closeModal }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
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
    
            const data = await response.json(); // Yanıtı JSON formatında alın
    
            console.log('Login response:', data); // Yanıtı kontrol edin
    
            if (response.ok) {
                // Yanıt başarılıysa, localStorage'a gerekli verileri kaydedin
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userId', data.userId);
    
                // Yönlendirme işlemi
                navigate('/customer-profile');
                closeModal(); // Modal'ı kapat
            } else {
                console.error('Login failed with status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
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
                <button type="submit">Giriş Yap</button>
            </form>

            {profile && (
                <div>
                    <h3>Profil Bilgileri</h3>
                    <p>ID: {profile.id}</p>
                    <p>Kullanıcı Adı: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                </div>
            )}
        </div>
    );
}

export default Login;