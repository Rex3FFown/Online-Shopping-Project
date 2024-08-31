import React, { useState, useEffect } from "react";
import { Trash, PlusCircle, XCircle, Pencil } from "@phosphor-icons/react";
import "./Product.css"; // CSS dosyasını aynı şekilde kullan

function Products() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [productList, setProductList] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalMode, setModalMode] = useState(null);
    const [productForm, setProductForm] = useState({ name: '', description: '', price: '',category_id:'', imageUrl: '' });
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        setUserRole(localStorage.getItem('role'));

       
        if (userRole === 'ADMIN') {
            getAllProducts();
        }
    }, [userRole]);

    useEffect(() => {
        filterProducts();
    }, [productList, searchTerm]);

    const getAllProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/products", { method: "GET", credentials: 'include' });
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await res.json();
            console.log("result =",result);
            setIsLoaded(true);
            setProductList(result);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
        }
    };

    const filterProducts = () => {
        if (!searchTerm) {
            setFilteredProductList(productList);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filteredList = productList.filter(product =>
                product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                product.description.toLowerCase().includes(lowercasedSearchTerm) ||
                product.price.toString().includes(lowercasedSearchTerm)
            );
            setFilteredProductList(filteredList);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8080/products/${productId}`, { method: "DELETE", credentials: 'include' });
            if (!response.ok) {
                console.error("Silinemedi");
                return;
            }
            setProductList(productList.filter(p => p.id !== productId));
        } catch (error) {
            console.error("Silinemedi");
        }
    };

    const saveProduct = async () => {
        const url = modalMode === "add" ? "http://localhost:8080/products" : `http://localhost:8080/products/${selectedProductId}`;
        const method = modalMode === "add" ? "POST" : "PUT";

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                credentials: 'include',
                body: JSON.stringify(productForm)
            });

            if (!response.ok) {
                console.error(modalMode === "add" ? "Eklenemedi" : "Güncellenemedi");
                return;
            }
            setModalMode(null);
            getAllProducts();
        } catch (error) {
            console.error(modalMode === "add" ? "Eklenemedi" : "Güncellenemedi");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductForm({ ...productForm, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const openAddModal = () => {
        setModalMode("add");
        setProductForm({ name: '', description: '', price: '',category_id:'', imageUrl: '' });
    };

    const openUpdateModal = (product) => {
        setModalMode("update");
        setSelectedProductId(product.id);
        setProductForm({ name: product.name, description: product.description, price: product.price,category_id: product.category, imageUrl: product.imageUrl});
    };

    const closeModal = () => {
        setModalMode(null);
    };
  
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (userRole !== 'ADMIN') {
        return <div>Bu sayfayı görüntüleme izniniz yok.</div>;
    } else {
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
                    <button onClick={openAddModal} className="add-product-button">
                        <div className="addProductButtonContainer">
                            <PlusCircle size={32} />
                            <span>Yeni Ürün Ekle</span>
                        </div>
                    </button>
                </div>

                <table className="post-table">
                    <thead>
                        <tr>
                            <th>Ürün Adı</th>
                            <th>Açıklama</th>
                            <th>Fiyat</th>
                     
                            <th>Resim</th>
                            <th>İşlemler</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProductList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                              
                                <td>{product.price} ₺</td>
                                <td>
                                    <img src={product.imageUrl} alt={product.name} style={{ width: "100px", height: "auto"}} />
                                </td>
                                <td>
                                    <button className="custom-icon-button" onClick={() => deleteProduct(product.id)}>
                                        <Trash size={25} />
                                    </button>
                                    <button className="custom-icon-button" onClick={() => openUpdateModal(product)}>
                                        <Pencil size={25} />
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
                            <h2>{modalMode === "add" ? "Yeni Ürün Ekle" : "Ürünü Güncelle"}</h2>
                            <form onSubmit={(e) => { e.preventDefault(); saveProduct(); }}>
                                <label>
                                    Ürün Adı:
                                    <input type="text" name="name" value={productForm.name} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Açıklama:
                                    <input type="text" name="description" value={productForm.description} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Fiyat:
                                    <input type="number" name="price" value={productForm.price} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Kategori:
                                    <input type="number" name="categories" value={productForm.category_id} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Resim URL:
                                    <input type="text" name="imageUrl" value={productForm.imageUrl} onChange={handleInputChange} />
                                </label>
                                <button type="submit" className="submit-button">{modalMode === "add" ? "Oluştur" : "Güncelle"}</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Products;
