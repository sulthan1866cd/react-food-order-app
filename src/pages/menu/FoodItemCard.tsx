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
  const auth = useAuthContext();
  const username = auth?.username ?? "";
  const authorization = auth?.authKey;
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
      <div className="quantity">
        <button
          onClick={() =>
            setQuantity(() => (quantity === 1 ? quantity : quantity - 1))
          }
        >
          -
        </button>
        <p>quantity: {quantity}</p>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>{" "}
      </div>
      <button onClick={orderFood}>order</button>
    </BaseFoodItemCard>
  );
};

export default FoodItemCard;
