import { useEffect, useState } from "react";
import { type FoodItem } from "../../interface/foodItem.interface";
import { HttpUtils } from "../../utils/http.utils";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import FoodItemEditCard from "../../components/BaseFoodItemCard";
import AddFoodItem from "./AddFoodItem";
import EditBtn from "./PutFoodItem";
import "../menu/menu.scss";

const EditMenu = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<{
    min: string;
    max: string;
  }>({ min: "", max: "" });
  const auth = useAuthContext();
  const authorization = auth?.authorization;

  useEffect(() => {
    HttpUtils.get<FoodItem[]>(
      `food-items?search-query=${searchQuery}&min=${priceRange.min}&max=${priceRange.max}`,
      { setter: setFoodItems }
    );
  }, [searchQuery, priceRange]);

  const deleteFood = async (id?: string) => {
    const result = await HttpUtils.delete<FoodItem>(`food-items/${id}`, {
      authorization,
    });
    if (result.status === 200) toast.success("food item removed successfully!");
    else toast.error("food item dosent exits!");

    setFoodItems(foodItems.filter((foodItem) => foodItem.id !== id));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <h1 className="title">Edit Menu</h1>
          <p className="welcome-text">Manage your food items</p>
        </div>
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
            <option value="">All prices</option>
            <option>0 - 50</option>
            <option>50 - 80</option>
            <option>80 - 150</option>
          </select>
        </div>
      </div>

      <div className="food-list">
        {foodItems.length == 0 ? (
          <div className="no-results">
            <span className="no-results-icon">🍽️</span>
            <p>No items found</p>
            <p className="no-results-hint">Try adjusting your filters</p>
          </div>
        ) : (
          foodItems.map((foodItem, index) => {
            return (
              <FoodItemEditCard foodItem={foodItem} key={index}>
                <EditBtn
                  setFoodItems={setFoodItems}
                  onDelte={() => deleteFood(foodItem.id)}
                  foodItem={foodItem}
                />
              </FoodItemEditCard>
            );
          })
        )}
        <AddFoodItem setFoodItems={setFoodItems} />
      </div>
    </div>
  );
};

export default EditMenu;
