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

const createNewOrder = async (customerId, clearBasket) => {
  const response = await fetch(`http://localhost:8080/orders/${customerId}`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    }
  });
  const data = await response.json();
  localStorage.setItem("orderId", data.id);
  console.log(data);

  clearBasket();
}

const updateItemQuantity = async (itemId, newQuantity) => {
  try {
    if (newQuantity <= 0) {
      throw new Error('Geçersiz miktar');
    }

    const res = await fetch(`${API_URL_ITEMS}/${itemId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ quantity: newQuantity })
    });

    if (!res.ok) {
      throw new Error('Ürün miktarı güncellenirken bir sorun oluştu');
    }

    return await res.json();
  } catch (error) {
    console.error('Miktar güncellenemedi:', error);
    throw error;
  }
};

const BasketItem = ({ item, onRemove, onQuantityChange }) => (
  <div className="basket-item">
    <img src={item.product.imageUrl} alt={item.product.name} width="100" height="100" />
    <div className="basket-item-details">
      <h3>{item.product.name}</h3>
      <p>{item.product.description}</p>
      <span>{item.quantity} x {item.price.toFixed(2)} ₺</span>
    </div>
    <div className="basket-item-actions">
      <button style={{ backgroundColor: "red", position: "absolute", marginLeft: "-100px" }} onClick={() => onQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-1</button>
      <button style={{ backgroundColor: "green", marginLeft: "-50px", position: "absolute" }} onClick={() => onQuantityChange(item.id, item.quantity + 1)} >+1</button>
      <button onClick={() => onRemove(item.id)}>Sepetten Sil</button>
    </div>
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
        const basketId = localStorage.getItem('basketId');

        const basketItemList = await getBasketItemsForThisCustomer(basketData.id);
        setBasketItems(basketItemList);
      } catch (error) {
        console.error('Sepet getirilirken bir hata oluştu:', error);
        setError(error.message);
      }
    };

    fetchBasket();
  }, [customerId]);

  const clearBasket = () => {
    setBasketItems([]);
    setBasket("a");

  }
  const removeFromBasket = async (itemId) => {
    try {
      const basketId = localStorage.getItem("basketId");
      if (!basketId) {
        throw new Error('Sepetinize ulaşılamıyor');
      }

      const res = await fetch(`${API_URL_ITEMS}/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
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

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const updatedItem = await updateItemQuantity(itemId, newQuantity);
      if (updatedItem) {
        setBasketItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: updatedItem.quantity } : item
          )
        );
      } else {
        setBasketItems(prevItems => prevItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
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
            <BasketItem
              key={item.id}
              item={item}
              onRemove={removeFromBasket}
              onQuantityChange={handleQuantityChange}
            />
          ))
        ) : (
          <p>Sepetiniz boş.</p>
        )}
      </div>
      <div className="basket-total">
        <strong>Toplam Tutar: {basketItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)} ₺</strong>
      </div>
      <button className="finish-button" onClick={() => createNewOrder(customerId,clearBasket)}>ALIŞVERİŞİ TAMAMLA</button>
    </div>
  );
};

export default Basket;
