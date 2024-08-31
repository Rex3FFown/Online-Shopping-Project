import React, { useState, useEffect } from "react";
import { Trash, PlusCircle, XCircle, Pencil, CaretDown } from "@phosphor-icons/react";
import "./Customer.css";

function Customer() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    const [filteredCustomerList, setFilteredCustomerList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalMode, setModalMode] = useState(null); 
    const [customerForm, setCustomerForm] = useState({ name: '', surname: '', email: '', password: '', address: '' });
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [visibleDropdowns, setVisibleDropdowns] = useState(new Set());
    const [customerOrders, setCustomerOrders] = useState({});
    const [orderModalVisible, setOrderModalVisible] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
  
        setUserRole(localStorage.getItem('role'));


        if (userRole === 'ADMIN') {
            getAllCustomers();
        }
    }, [userRole]);

    useEffect(() => {
        filterCustomers();
    }, [customerList, searchTerm]);

    const getAllCustomers = async () => {
        try {
            const res = await fetch("http://localhost:8080/customers", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            
            if (!res.ok) {
                console.error("Alınamadı");
                return;
            }
            const result = await res.json();
            console.log(localStorage.getItem("token"));
            setIsLoaded(true);
            setCustomerList(result);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    };

    const filterCustomers = () => {
        if (!searchTerm) {
            setFilteredCustomerList(customerList);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filteredList = customerList.filter(customer =>
                customer.name.toLowerCase().includes(lowercasedSearchTerm) ||
                customer.surname.toLowerCase().includes(lowercasedSearchTerm) ||
                customer.email.toLowerCase().includes(lowercasedSearchTerm) ||
                customer.address.toLowerCase().includes(lowercasedSearchTerm)
            );
            setFilteredCustomerList(filteredList);
        }
    };

    const deleteCustomer = async (customerId) => {
        try {
            const response = await fetch(`http://localhost:8080/customers/${customerId}`, {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            });
            if (!response.ok) {
                console.error("Silinemedi");
                return;
            }
            setCustomerList(customerList.filter(p => p.id !== customerId));
        } catch (error) {
            console.error("Silinemedi");
        }
    };

    const saveCustomer = async () => {
        const url = modalMode === "add" ? "http://localhost:8080/customers" : `http://localhost:8080/customers/${selectedCustomerId}`;
        const method = modalMode === "add" ? "POST" : "PUT";
    

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                credentials: 'include',
                body: JSON.stringify(customerForm)
            });

            if (!response.ok) {
                console.error(modalMode === "add" ? "Eklenemedi" : "Güncellenemedi");
                return;
            }
            setModalMode(null);
            getAllCustomers();
        } catch (error) {
            console.error(modalMode === "add" ? "Eklenemedi" : "Güncellenemedi");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerForm({ ...customerForm, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const openAddModal = () => {
        setModalMode("add");
        setCustomerForm({ name: '', surname: '', email: '', password: '', address: '' });
    };

    const openUpdateModal = (customer) => {
        setModalMode("update");
        setSelectedCustomerId(customer.id);
        setCustomerForm({ name: customer.name, surname: customer.surname, email: customer.email, password: customer.password, address: customer.address });
    };

    const closeModal = () => {
        setModalMode(null);
    };

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
            setCustomerOrders(prev => ({ ...prev, [customerId]: result }));
        } catch (error) {
            console.error("Siparişler alınamadı");
        }
    };

    const handleDropdownClick = (customerId) => {
        if (visibleDropdowns.has(customerId)) {
            setVisibleDropdowns(prev => new Set([...prev].filter(id => id !== customerId)));
        } else {
            fetchCustomerOrders(customerId);
            setVisibleDropdowns(prev => new Set(prev).add(customerId));
        }
    };

    const handleCloseDropdown = (customerId) => {
        setVisibleDropdowns(prev => new Set([...prev].filter(id => id !== customerId)));
    };

    const openOrderModal = (customerId) => {
        fetchCustomerOrders(customerId);
        setSelectedCustomerId(customerId);
        setOrderModalVisible(true);
    };

    const closeOrderModal = () => {
        setOrderModalVisible(false);
        setSelectedCustomerId(null);
    };

   
    if (userRole !== 'ADMIN') {
        return <div>Bu sayfayı görüntüleme izniniz yok.</div>;
    }

    return (
        <div className="table-container">
            <div className="header-container">
                <input
                    type="text"
                    placeholder="Arama yap..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={openAddModal} className="add-user-button">
                    <div className="addUserButtonContainer">
                        <PlusCircle size={32} />
                        <span>Yeni Kullanıcı Ekle</span>
                    </div>
                </button>
            </div>

            <table className="post-table">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>Email</th>
                        <th>Adres</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomerList.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.surname}</td>
                            <td>{customer.email}</td>
                            <td>{customer.address}</td>
                            <td>
                                <button className="custom-icon-button" onClick={() => deleteCustomer(customer.id)}>
                                    <Trash size={25} />
                                </button>
                                <button className="custom-icon-button" onClick={() => openUpdateModal(customer)}>
                                    <Pencil size={25} />
                                </button>
                                <button className="orders-button" onClick={() => openOrderModal(customer.id)}>
                                    <CaretDown size={25} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalMode && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={closeModal} className="close-modal">
                            <XCircle size={24} />
                        </button>
                        <h2>{modalMode === "add" ? "Yeni Kullanıcı Ekle" : "Kullanıcıyı Güncelle"}</h2>
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
                            <button type="submit" className="submit-button">{modalMode === "add" ? "Oluştur" : "Güncelle"}</button>
                        </form>
                    </div>
                </div>
            )}

            {orderModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <button onClick={closeOrderModal} className="close-modal">
                            <XCircle size={24} />
                        </button>
                        <h2>Siparişler</h2>
                        <ul>
                            {customerOrders[selectedCustomerId]?.map((order) => (
                                <li key={order.id}>
                                    <strong>Sipariş ID:</strong> {order.id} <br />
                                    <strong>Tarih:</strong> {order.date} <br />
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
                                </li>
                            )) || <li>Yükleniyor...</li>}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customer;
