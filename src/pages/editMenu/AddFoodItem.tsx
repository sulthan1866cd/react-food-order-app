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
  const [image, setImage] = useState<string>("");

  const handleSubmit = async () => {
    setName(name.trim());
    setImage(image.trim());
    if (!Validator.isValidForm(name, price, image)) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (!Validator.isLink(image)) {
      toast.warning("Image should be a link to image");
      return;
    }
    const result = await HttpUtils.post<Omit<FoodItem, "id">>(
      "food-items",
      {
        name,
        price,
        image,
      },
      { authorization }
    );
    setFoodItems((foodItems) => [...foodItems, result.data]);
    setName("");
    setPrice(0);
    setImage("");
    setIsAdding(false);
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
            image={image}
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
