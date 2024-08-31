import React, { useEffect, useState } from 'react';
import './Profile.css'; 

function CustomerProfile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const profileData = {
            id: localStorage.getItem('userId'),
            username: localStorage.getItem('userName'),
            surname : localStorage.getItem('userSurname'),
            email: localStorage.getItem('userEmail')
        };

        setProfile(profileData);
    }, []);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profil</h1>
            <p className="username">Kullanıcı Adı: {profile.username} {profile.surname}</p>
            <p className="email">Email: {profile.email}</p>
        </div>
    );
}

export default CustomerProfile;
