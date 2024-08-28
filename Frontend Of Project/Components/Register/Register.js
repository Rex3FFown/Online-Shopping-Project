import React, { useState } from "react";
import { XCircle } from "@phosphor-icons/react";
import "../Register/Register.css"; // Import CSS for styling

function Register({ onClose }) {
    const [customerForm, setCustomerForm] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        address: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const saveCustomer = async () => {
        const url = "http://localhost:8080/customers/register";
        const method = "POST";
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(customerForm)
            });

            if (response.ok) {
                setSuccessMessage("Kullanıcı başarıyla kaydedildi.");
                setErrorMessage(''); // Clear any previous error messages
                setTimeout(() => {
                    onClose(); // Close the modal after successful registration
                }, 2000); // Delay to allow user to see the success message
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Kayıt başarısız! Lütfen tekrar deneyin.");
                setSuccessMessage(''); // Clear any previous success messages
            }
        } catch (error) {
            console.error("Eklenemedi", error);
            setErrorMessage("Bir hata oluştu! Lütfen tekrar deneyin.");
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose} className="close-modal">
                    <XCircle size={24} />
                </button>
                <h2>Yeni Kullanıcı Ekle</h2>
                <form onSubmit={(e) => { e.preventDefault(); saveCustomer(); }}>
                    <label>
                        Ad:
                        <input type="text" name="name" value={customerForm.name} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Soyad:
                        <input type="text" name="surname" value={customerForm.surname} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Mail:
                        <input type="email" name="email" value={customerForm.email} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Adres:
                        <input type="text" name="address" value={customerForm.address} onChange={handleInputChange} required />
                    </label>
                    <label>
                        Şifre:
                        <input type="password" name="password" value={customerForm.password} onChange={handleInputChange} required />
                    </label>
                    <button type="submit" className="myButton">Oluştur</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
}

export default Register;
