import React, { useState, useEffect } from 'react';
import './Product2.css';



const API_URL = 'http://localhost:8080/api/baskets';


const addToBasket = async (productId) => {
  try {
    const customerId = localStorage.getItem("userId");
    if (!customerId) {
      throw new Error('Customer ID is missing.');
    }

    const res = await fetch(`${API_URL}/customer/${customerId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      mode:"no-cors",
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error('Error fetching the basket');
    }

    const basket = await res.json(); 

    const basketItemRes = await fetch(`${API_URL}/${basket.id}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ productId, quantity: 1 }),
      credentials: 'include'
    });

    if (!basketItemRes.ok) {
      throw new Error('Error adding item to basket');
    }

    alert('Product added to basket');
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};


const Products = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [sortOrder, setSortOrder] =useState('none');

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
  const sortProducts = (products, order) => {
    if (order === 'none') {
        return products; // No sorting applied
    }
    return [...products].sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
};

const handleSortChange = (event) => {
    setSortOrder(event.target.value);
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
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
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
