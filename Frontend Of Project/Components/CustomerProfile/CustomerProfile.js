import React, { useEffect, useState } from 'react';

function CustomerProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // localStorage'dan profil bilgilerini al
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        console.log('Token:', token);
        console.log('Role:', role);

        const profileData = {
            id: localStorage.getItem('Id'),
            username: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
        };

        setProfile(profileData);
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Customer Profile</h1>
            <p>ID: {profile.id}</p>
            <p>Kullanıcı Adı: {profile.name}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
}

export default CustomerProfile;