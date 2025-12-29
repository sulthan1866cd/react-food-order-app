import { useState } from "react";
import FoodItemForm from "./FoodItemForm";
import { HttpUtils } from "../../utils/http.utils";
import { type FoodItem } from "../../interface/foodItem.interface";
import { useAuthContext } from "../../auth/AuthContext";
import { toast } from "react-toastify";
import { Validator } from "../../utils/validator.utils";

interface Props {
  foodItem: FoodItem;
  onDelte: () => void;
}
const EditBtn = ({ foodItem, onDelte }: Props) => {
  const [isEditing, setEditing] = useState<boolean>(false);

  const [name, setName] = useState<string>(foodItem.name);
  const [price, setPrice] = useState<number>(foodItem.price);
  const [image, setImage] = useState<string>(foodItem.image);

  const auth = useAuthContext();
  const authorization = auth?.authKey;

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
    await HttpUtils.put<FoodItem>(
      `food-items/${foodItem.id}`,
      {
        id: foodItem.id,
        name,
        price,
        image,
      },
      { authorization }
    );
    toast.success(`${foodItem.name} updated successfully`);
    setEditing(false);
  };
  
  return (
    <>
      {isEditing ? (
        <FoodItemForm
          name={name}
          setName={setName}
          price={price}
          setPrice={setPrice}
          image={image}
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
