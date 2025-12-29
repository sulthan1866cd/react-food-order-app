import { useEffect, useState } from "react";
import { type FoodItem } from "../../interface/foodItem.interface";
import FoodItemCard from "./FoodItemCard";
import "./menu.scss";
import { useNavigate } from "react-router-dom";
import { HttpUtils } from "../../utils/http.utils";

const Menu = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{
    min: string;
    max: string;
  }>({ min: "", max: "" });
  const navigate = useNavigate();

  useEffect(() => {
    HttpUtils.get<FoodItem[]>(
      `food-items?search-query=${searchQuery}&min=${priceRange.min}&max=${priceRange.max}`,
      { setter: setFoodItems }
    );
  }, [searchQuery, priceRange]);

  return (
    <div>
      <h1>Menu</h1>
      <label>Search</label>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
      />
      <select
        onChange={(e) => {
          const [min, max] = e.currentTarget.value.split(" - ");
          setPriceRange({ min, max });
        }}
      >
        <option value=""> price range</option>
        <option>0 - 50</option>
        <option>50 - 80</option>
        <option>80 - 150</option>
      </select>
      <button
        onClick={() => {
          navigate("/my-orders");
        }}
      >
        see my orders
      </button>
      <div className="food-list">
        {foodItems.length == 0 ? (
          <>no items found, try clearing filters</>
        ) : (
          foodItems.map((foodItem, index) => (
            <FoodItemCard foodItem={foodItem} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Menu;
