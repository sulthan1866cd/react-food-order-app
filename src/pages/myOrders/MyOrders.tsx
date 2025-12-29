import { useEffect, useState } from "react";
import { type Order } from "../../interface/order.interface";
import { useAuthContext } from "../../auth/AuthContext";
import FoodItemCard from "../../components/BaseFoodItemCard";
import { HttpUtils } from "../../utils/http.utils";
import { useNavigate } from "react-router-dom";
import type { FoodItem } from "../../interface/foodItem.interface";

const MyOrders = () => {
  const auth = useAuthContext();
  const username = auth?.username;
  const authorization = auth?.authKey;
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
    <div>
      <h1>My Orders</h1>
      <div className="food-list">
        {orders.length === 0 ? (
          <>
            you do not have any orders yet
            <button onClick={() => navigate("/menu")}>order now</button>
          </>
        ) : (
          orders.map((order, index) => (
            <FoodItemCard key={index} foodItem={order.foodItem as FoodItem}>
              <p>quantity: {order.quantity}</p>
              <p>total: ₹{order.quantity * order.foodItem.price}</p>
              <button onClick={() => cancelOrder(order.id)}>cancel</button>
            </FoodItemCard>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
