import { useEffect, useState } from "react";
import { type Order } from "../../interface/order.interface";
import { useAuthContext } from "../../auth/AuthContext";
import BaseFoodItemCard from "../../components/BaseFoodItemCard";
import { HttpUtils } from "../../utils/http.utils";
import { useNavigate } from "react-router-dom";
import type { FoodItem } from "../../interface/foodItem.interface";

const MyOrders = () => {
  const { username, authorization } = useAuthContext()!;
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    HttpUtils.get<Order[]>(`orders/${username}`, {
      setter: setOrders,
      authorization,
    });
  }, [username, authorization]);
  const cancelOrder = (id?: string) => {
    HttpUtils.delete(`orders/${id}`, { authorization });
    setOrders(orders.filter((order) => order.id !== id));
  };
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">My Orders</h1>
      </div>
      <div className="food-list">
        {orders.length === 0 ? (
          <>
            <div className="no-results">
              <span className="no-results-icon">🔍</span>
              <p>you do not have any orders yet</p>
              <p className="no-results-hint">
                <button onClick={() => navigate("/menu")}>order now</button>
              </p>
            </div>
          </>
        ) : (
          orders.map((order, index) => (
            <BaseFoodItemCard key={index} foodItem={order.foodItem as FoodItem}>
              <p className="quantity-controls">
                <div className="quantity-display">
                  <span className="quantity-label">Qty</span>
                  <span className="quantity-value"> {order.quantity}</span>
                </div>
              </p>
              <div className="food-details">
                <div className="food-price">
                  <span className="price-label">Total:</span>
                  <span className="price-value">
                    ₹{order.quantity * order.foodItem.price}
                  </span>
                </div>
              </div>
              <button
                className="order-btn"
                onClick={() => cancelOrder(order.id)}
              >
                cancel
              </button>
            </BaseFoodItemCard>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
