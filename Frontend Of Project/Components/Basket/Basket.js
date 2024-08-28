import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:8080/api/baskets';

const getBasketByCustomerId = async (customerId) => {
 
  const response = await fetch(`${API_URL}/customer/${customerId}`,{ headers: {
    "Content-Type": "application/json",
    "Authorization": localStorage.getItem("token")
}});
  if (!response.ok) throw new Error('Error fetching basket');
  return response.json();
};

const BasketItem = ({ item, onRemove }) => (
  <div className="basket-item">
    <span>{item.product}</span>
    <span>{item.quantity} x ${item.price.toFixed(2)}</span>
    <button onClick={() => onRemove(item.id)}>Remove</button>
  </div>
);

const Basket = () => {
  const [basket, setBasket] = useState(null);
  const [error, setError] = useState(null);
  const customerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const data = await getBasketByCustomerId(customerId);
        setBasket(data);

        
        localStorage.setItem("basketId", data.id);
      } catch (error) {
        console.error('Error fetching basket:', error);
        setError(error.message);
      }
    };

    fetchBasket();
  }, [customerId]);

  const removeFromBasket = async (itemId) => {
    try {
      const basketId = localStorage.getItem("basketId");
      if (!basketId) {
        throw new Error('Basket ID is missing.');
      }

      const res = await fetch(`${API_URL}/${basketId}/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Error removing item from basket');
      }

      setBasket((prevBasket) => ({
        ...prevBasket,
        basketItems: prevBasket.basketItems.filter(item => item.id !== itemId),
      }));
    } catch (error) {
      console.error('Error removing item:', error);
      setError(error.message);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!basket) return <div>Loading...</div>;

  return (
    <div>
      <h2>Basket</h2>
      <div>
        {basket.basketItems.length > 0 ? (
          basket.basketItems.map(item => (
            <BasketItem key={item.id} item={item} onRemove={removeFromBasket} />
          ))
        ) : (
          <p>Sepetiniz boş.</p>
        )}
      </div>
      <div>
        <strong>
          Total: ${basket.basketItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)}
        </strong>
      </div>
    </div>
  );
};

export default Basket;