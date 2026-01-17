import { toast } from "react-toastify";
import type { FoodItem } from "../../interface/foodItem.interface";
import { type Order } from "../../interface/order.interface";
import { useState } from "react";
import { useAuthContext } from "../../auth/AuthContext";
import { HttpUtils } from "../../utils/http.utils";
import BaseFoodItemCard from "../../components/BaseFoodItemCard";

interface Props {
  foodItem: FoodItem;
}

const FoodItemCard = ({ foodItem }: Props) => {
  const { username, authorization } = useAuthContext()!;
  const [quantity, setQuantity] = useState<number>(1);

  const orderFood = async () => {
    const result = await HttpUtils.post<Omit<Order, "foodItem" | "id">>(
      "orders",
      {
        foodItemId: foodItem.id,
        quantity: quantity,
        time: new Date(),
        username,
      },
      { authorization }
    );
    if (result.status === 201) {
      toast.success("order placed successfully!");
    }
  };

  return (
    <BaseFoodItemCard foodItem={foodItem}>
      <div className="quantity-controls">
        <button
          className="quantity-btn decrease"
          onClick={() =>
            setQuantity(() => (quantity === 1 ? quantity : quantity - 1))
          }
          disabled={quantity === 1}
        >
          −
        </button>
        <div className="quantity-display">
          <span className="quantity-label">Qty</span>
          <span className="quantity-value">{quantity}</span>
        </div>
        <button
          className="quantity-btn increase"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
      <button className="order-btn" onClick={orderFood}>
        <span>🛒</span> Add to Order
      </button>
    </BaseFoodItemCard>
  );
};

export default FoodItemCard;
