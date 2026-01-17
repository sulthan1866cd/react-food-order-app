import { useEffect, useState } from "react";
import { type Order } from "../../interface/order.interface";
import { useAuthContext } from "../../auth/AuthContext";
import FoodItemCard from "../../components/BaseFoodItemCard";
import { HttpUtils } from "../../utils/http.utils";
import type { FoodItem } from "../../interface/foodItem.interface";
import "../menu/menu.scss";

const AllOrders = () => {
  // repeated MYOrders bad code
  const { username, authorization } = useAuthContext()!;
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    HttpUtils.get<Order[]>(`orders`, {
      setter: setOrders,
      authorization,
    });
  }, [username, authorization]);
  const completeOrder = (id?: string) => {
    HttpUtils.delete(`orders/${id}`, { authorization });
    setOrders(orders.filter((order) => order.id !== id));
  };
  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1 className="title">All Orders</h1>
          <p className="welcome-text">Manage all customer orders</p>
        </div>
      </div>

      <div className="food-list">
        {orders.length === 0 ? (
          <div className="no-results">
            <span className="no-results-icon">📦</span>
            <p>No orders yet</p>
            <p className="no-results-hint">
              Orders will appear here when customers place them
            </p>
          </div>
        ) : (
          orders.map((order, index) => (
            <FoodItemCard key={index} foodItem={order.foodItem as FoodItem}>
              <div className="quantity-controls">
                <div className="quantity-display">
                  <span className="quantity-label m">customer:</span>
                  <span className="quantity-value">{order.username}</span>
                  <span className="quantity-label m">quantity:</span>
                  <span className="quantity-value">{order.quantity}</span>
                  <span className="quantity-label m">total:</span>
                  <span className="quantity-value">
                    ₹{order.quantity * order.foodItem.price}
                  </span>
                </div>
              </div>
              <button
                className="order-btn"
                onClick={() => completeOrder(order.id)}
              >
                complete
              </button>
            </FoodItemCard>
          ))
        )}
      </div>
    </div>
  );
};

export default AllOrders;
