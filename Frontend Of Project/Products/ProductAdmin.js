import React, { useState, useEffect } from "react";
import { Trash, Pencil } from "@phosphor-icons/react";
import "./Product.css"; // CSS dosyasını aynı şekilde kullan

function Products() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        try {
            const res = await fetch("http://localhost:8080/products", { method: "GET", credentials: 'include' });
            if (!res.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await res.json();
            setIsLoaded(true);
            setProductList(result);
        } catch (error) {
            setIsLoaded(true);
            setError(error);
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="table-container">
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
                        {productList.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price} ₺</td>
                                <td>
                                    <img src={product.imageUrl} alt={product.name} style={{ width: "100px", height: "auto" }} />
                                </td>
                                <td>
                                    <button className="custom-icon-button" onClick={() => deleteProduct(product.id)}>
                                        <Trash size={25} />
                                    </button>
                                    <button className="custom-icon-button">
                                        <Pencil size={25} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Products;
