import React, { useState } from 'react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8080/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username.trim(), password: password.trim() }), // trim() ile boşlukları kaldırıyoruz
            });
    
            if (response.ok) {
                alert('Giriş Başarılı');
                const data = await response.json();
                console.log(data);
            } else {
                const errorText = await response.text();
                throw new Error(`Hata: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            alert(`Giriş başarısız: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
            <h2>Admin Girişi</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Kullanıcı Adı</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Şifre</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;