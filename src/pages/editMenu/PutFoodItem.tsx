import { useState, type Dispatch, type SetStateAction } from "react";
import FoodItemForm from "./FoodItemForm";
import { HttpUtils } from "../../utils/http.utils";
import { type FoodItem } from "../../interface/foodItem.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { Validator } from "../../utils/validator.utils";

interface Props {
  setFoodItems: Dispatch<SetStateAction<FoodItem[]>>;
  foodItem: FoodItem;
  onDelte: () => void;
}
// poor naming
// bad code
const EditBtn = ({ setFoodItems, foodItem, onDelte }: Props) => {
  const [isEditing, setEditing] = useState<boolean>(false);

  const [name, setName] = useState<string>(foodItem.name);
  const [price, setPrice] = useState<number>(foodItem.price);
  const [image, setImage] = useState<File|null>(null);

  const auth = useAuthContext();
  const authorization = auth?.authorization;

  const handleSubmit = async () => {
    setName(name.trim());
    if (name === foodItem.name && price === foodItem.price && !image) {
      toast.warning("No changes made");
      return;
    }
    if (!Validator.isValidForm(name, price)) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (!Validator.isPositive(price)) {
      toast.warning("price should be positive");
      return;
    }
    if (image && !Validator.isImageFile(image)) {
      toast.warning("Image should be a image file");
      return;
    }
    const formData = new FormData();
    formData.append("id", foodItem.id);
    formData.append("name", name);
    formData.append("price", price + "");
    formData.append("image", image ?? foodItem.image);
    const result = await HttpUtils.put<FormData>(
      `food-items/${foodItem.id}`,
      formData,
      {
        authorization,
      }
    );
    if (!result.data) return;
    setFoodItems((foodItems) =>
      foodItems.map((food) => (food.id === foodItem.id ? result.data : food))
    );
    toast.success(`${foodItem.name} updated successfully`);
    setEditing(false);
    setImage(null);
  };

  return (
    <>
      {isEditing ? (
        <FoodItemForm
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          setImage={setImage}
          handleSubmit={handleSubmit}
          onClose={() => setEditing(false)}
        />
      ) : (
        <>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={onDelte}>delete</button>
        </>
      )}
    </>
  );
};

export default EditBtn;
