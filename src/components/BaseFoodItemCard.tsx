import type { ReactNode } from "react";
import type { FoodItem } from "../interface/foodItem.interface";
import "./foodItemCard.scss"

interface Props {
  foodItem: FoodItem;
  children: ReactNode;
}
const BaseFoodItemCard = ({ foodItem, children }: Props) => {


  return (
    <div className="food-item-card">
      <div className="food-image-container">
        <img src={foodItem.image} alt={foodItem.name} className="food-image" />
      </div>
      <div className="food-details">
        <h2 className="food-name">{foodItem.name}</h2>
        <div className="food-price">
          <span className="price-label">Price:</span>
          <span className="price-value">₹{foodItem.price}</span>
        </div>
      </div>
      <div className="food-actions">
        {children}
      </div>
    </div>
  );
};

export default BaseFoodItemCard;