import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Product2.css';

const API_URL = 'http://localhost:8080/api/baskets';

const addToBasket = async (productId) => {
  const basketId = localStorage.getItem('basketId');
  try {
    const response = await fetch(`http://localhost:8080/api/basketitems/addItem/${productId}/${basketId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    });
    if (!response.ok) {
      throw new Error("Ürün sepete eklenirken hata oluştu");
    }
    const data = await response.json();
    console.log("Sepete eklenen ürün:", data);
  } catch (error) {
    console.error("Sepete ekleme hatası:", error);
  }
};

const Products = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductList, setFilteredProductList] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [productList, searchTerm]);

  const getAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/products", { method: "GET", credentials: 'include' });
      if (!res.ok) {
        throw new Error('Tırt');
      }
      const result = await res.json();
      const shuffledProducts = result.sort(() => Math.random() - 0.5);
      setIsLoaded(true);
      setProductList(shuffledProducts);
    } catch (error) {
      console.error("Fetch error:", error);
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
        product.description.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredProductList(filteredList);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="product-grid" id="special-page">
        <div className="header-container">
          <input
            type="text"
            placeholder="Arama yap..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search__input"
          />
        </div>

        {filteredProductList.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p className="price">{product.price} ₺</p>
            <p>
              <button onClick={() => addToBasket(product.id)}>Sepete Ekle</button>
            </p>
          </div>
        ))}
      </div>
    );
  }
};

export default Products;
