import type { ReactNode } from "react";
import type { FoodItem } from "../interface/foodItem.interface";
import "./foodItemCard.scss"

interface Props {
  foodItem: FoodItem;
  children: ReactNode;
}
const BaseFoodItemCard = ({ foodItem, children }: Props) => {


  return (
    <div>
      <div className="food-item-card">
        <h1>{foodItem.name}</h1>
        <img src={foodItem.image} />
        <h3>Price: ₹{foodItem.price}</h3>
        {children}
      </div>
    </div>
  );
};

export default BaseFoodItemCard;