import { useEffect, useState } from "react";
import { type FoodItem } from "../../interface/foodItem.interface";
import FoodItemCard from "./FoodItemCard";
import "./menu.scss";
import { useNavigate } from "react-router-dom";
import { HttpUtils } from "../../utils/http.utils";
import { useAuthContext } from "../../auth/AuthContext";

const Menu = () => {
  const { username } = useAuthContext()!;
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
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1 className="title">Our Menu</h1>
          <p className="welcome-text">Welcome, {username}</p>
        </div>
        <button
          className="orders-btn"
          onClick={() => {
            navigate("/my-orders");
          }}
        >
          <span>📋</span> My Orders
        </button>
      </div>

      <div className="filters-section">
        <div className="search-wrapper">
          <label className="filter-label">Search</label>
          <input
            type="text"
            className="search-input"
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
        </div>
        <div className="price-filter-wrapper">
          <label className="filter-label">Price Range</label>
          <select
            className="price-select"
            onChange={(e) => {
              const [min, max] = e.currentTarget.value.split(" - ");
              setPriceRange({ min, max });
            }}
          >
            <option value="">All Prices</option>
            <option>0 - 50</option>
            <option>50 - 80</option>
            <option>80 - 150</option>
          </select>
        </div>
      </div>

      <div className="food-list">
        {foodItems.length == 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <p>No items found</p>
            <p className="no-results-hint">
              Try clearing filters or adjusting your search
            </p>
          </div>
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
