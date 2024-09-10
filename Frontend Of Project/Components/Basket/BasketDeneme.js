import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Basket/Basket.css';

const API_URL = 'http://localhost:8080/api/baskets';
const API_URL_ITEMS = 'http://localhost:8080/api/basketitems';

const getBasketByCustomerId = async (customerId) => {
  const response = await fetch(`${API_URL}/customer/${customerId}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    }
  });
  if (!response.ok) throw new Error('Error fetching basket');
  const data = await response.json();
  return data;
};

const getBasketItemsForThisCustomer = async (basketId) => {
  const response = await fetch(`${API_URL_ITEMS}/${basketId}`, {
    method: "GET",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    }
  });
  const data = await response.json();
  return data;
};

const BasketItem = ({ item, onRemove }) => (
  <div className="basket-item">
    <img src={item.product.imageUrl} alt={item.product.name} width="100" height="100" />
    <div className="basket-item-details">
      <h3>{item.product.name}</h3>
      <p>{item.product.description}</p>
      <span>{item.quantity} x {item.price.toFixed(2)} ₺</span>
    </div>
    <button onClick={() => onRemove(item.id)}>Sepetten Sil</button>
  </div>
);

const Basket = () => {
  const [basket, setBasket] = useState(null);
  const [error, setError] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const customerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const basketData = await getBasketByCustomerId(customerId);
        setBasket(basketData);
        localStorage.setItem("basketId", basketData.id);

        
        const basketItemList = await getBasketItemsForThisCustomer(basketData.id);
        setBasketItems(basketItemList);
      } catch (error) {
        console.error('Sepet getirilirken bir hata oluştu:', error);
        setError(error.message);
      }
    };

    fetchBasket();
  }, [customerId]);

  const removeFromBasket = async (itemId) => {
    try {
      const basketId = localStorage.getItem("basketId");
      if (!basketId) {
        throw new Error('Sepetinize ulaşılamıyor');
      }

      const res = await fetch(`${API_URL}/${basketId}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Ürün silinirken bir sorun oluştu');
      }

      setBasketItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Ürün silinemedi:', error);
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (basket === null) return (
    <div style={{ textAlign: 'center' }}>
      <img
        className='loading'
        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
        alt="Yükleniyor..."
      />
      <h1>Sepetiniz Boş</h1>
    </div>
  );

  return (
    <div className="basket-container">
      <h2>Sepetiniz</h2>
      <div className="basket-items-container">
        {basketItems.length > 0 ? (
          basketItems.map(item => (
            <BasketItem key={item.id} item={item} onRemove={removeFromBasket} />
          ))
        ) : (
          <p>Sepetiniz boş.</p>
        )}
      </div>
      <div className="basket-total">
        <strong>Toplam Tutar: {basketItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)} ₺</strong>
      </div>
    </div>
  );
};

export default Basket;
