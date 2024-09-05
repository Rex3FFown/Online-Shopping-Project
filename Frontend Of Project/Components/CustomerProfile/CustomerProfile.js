import React, { useEffect, useState } from 'react';
import './Profile.css'; 

function CustomerProfile() {
    const [profile, setProfile] = useState(null);
    const [customerOrder, setCustomerOrder] = useState({});
    const [openOrderId, setOpenOrderId] = useState(null); // Siparişlerin açık olup olmadığını takip etmek için state

    useEffect(() => {
        const profileData = {
            id: localStorage.getItem('userId'),
            username: localStorage.getItem('userName'),
            surname: localStorage.getItem('userSurname'),
            email: localStorage.getItem('userEmail'),
            adres: localStorage.getItem('userAddress')
        };

        setProfile(profileData);
        fetchCustomerOrders(profileData.id); 
    }, []);

    const fetchCustomerOrders = async (customerId) => {
        try {
            const res = await fetch(`http://localhost:8080/orders/${customerId}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            if (!res.ok) {
                console.error("Siparişler alınamadı");
                return;
            }
            const result = await res.json();
            setCustomerOrder(prev => ({ ...prev, [customerId]: result }));
        } catch (error) {
            console.error("Siparişler alınamadı");
        }
    };

    const toggleOrderDetails = (orderId) => {
        setOpenOrderId(prev => (prev === orderId ? null : orderId));
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profil</h1>
            <p className="username">Ad Soyad: {profile.username} {profile.surname}</p>
            <p className="email">Email: {profile.email}</p>
            <p className="email">Adres: {profile.adres}</p>
            {console.log(profile.email)}
            <ul>
                {customerOrder[profile.id]?.length ? (
                    customerOrder[profile.id].map((order) => (
                        <li key={order.id}>
                            <div onClick={() => toggleOrderDetails(order.id)} className="order-summary">
                                <strong>Sipariş ID:</strong> {order.id} <br />
                                <strong>Tarih:</strong> {order.date} <br />
                            </div>
                            {openOrderId === order.id && (
                                <div className="order-details">
                                    <strong>Ürünler:</strong> <br />
                                    <ul>
                                        {order.orderItems.map(item => (
                                            <li key={item.id}>
                                                {item.product.imageUrl && (
                                                    <img src={item.product.imageUrl} alt={item.product.name} className="product-image" />
                                                )}
                                                {item.product.name} - {item.count} x {item.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <li>Henüz yaptığınız bir sipariş bulunmuyor.</li>
                )}
            </ul>
        </div>
    );
}

export default CustomerProfile;
