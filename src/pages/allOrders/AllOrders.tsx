import { useEffect, useState } from "react";
import { type Order } from "../../interface/order.interface";
import { useAuthContext } from "../../auth/AuthContext";
import FoodItemCard from "../../components/BaseFoodItemCard";
import { HttpUtils } from "../../utils/http.utils";
import type { FoodItem } from "../../interface/foodItem.interface";

const AllOrders = () => {// repeated MYOrders bad code
  const auth = useAuthContext();
  const username = auth?.username;
  const authorization = auth?.authKey;
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
    <div>
      <h1>All Orders</h1>
      <div className="food-list">
        {orders.length === 0 ? (
          <>there is not any orders yet</>
        ) : (
          orders.map((order, index) => (
            <FoodItemCard key={index} foodItem={order.foodItem as FoodItem}>
              <p>customer: {order.username}</p>
              <p>quantity: {order.quantity}</p>
              <p>total: ₹{order.quantity * order.foodItem.price}</p>
              <button onClick={() => completeOrder(order.id)}>complete</button>
            </FoodItemCard>
          ))
        )}
      </div>
    </div>
  );
};

export default AllOrders;
