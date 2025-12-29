import type { FoodItem } from "./foodItem.interface";

export interface Order {
  id: string;
  username: string;
  time: Date;
  foodItem: FoodItem;
  foodItemId: string;
  quantity: number;
}
