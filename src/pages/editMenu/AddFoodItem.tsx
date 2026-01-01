import { useState, type Dispatch, type SetStateAction } from "react";
import { HttpUtils } from "../../utils/http.utils";
import { type FoodItem } from "../../interface/foodItem.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { Validator } from "../../utils/validator.utils";
import { toast } from "react-toastify";
import FoodItemForm from "./FoodItemForm";

interface Props {
  setFoodItems: Dispatch<SetStateAction<FoodItem[]>>;
}
const AddFoodItem = ({ setFoodItems }: Props) => {
  const auth = useAuthContext();
  const authorization = auth?.authKey;

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    setName(name.trim());
    if (!Validator.isValidForm(name, price)) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (!Validator.isPositive(price)) {
      toast.warning("price should be positive");
      return;
    }
    if (!Validator.isImageFile(image)) {
      toast.warning("Image should be a image file");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price + "");
    formData.append("image", image as File);
    const result = await HttpUtils.post<FormData>("food-items", formData, {
      authorization,
    });
    if (!result.data) return;
    setFoodItems((foodItems) => [...foodItems, result.data]);
    setName("");
    setPrice(0);
    setImage(null);
    setIsAdding(false);
    toast.success("foodItem added successfully");
  };
  return (
    <div className="food-item-card">
      {isAdding ? (
        <>
          <FoodItemForm
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            setImage={setImage}
            onClose={() => setIsAdding(false)}
            handleSubmit={handleSubmit}
          />
        </>
      ) : (
        <button onClick={() => setIsAdding(true)}>+</button>
      )}
    </div>
  );
};

export default AddFoodItem;
