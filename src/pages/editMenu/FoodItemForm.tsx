import { type Dispatch, type SetStateAction } from "react";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;

  onClose: () => void;
  handleSubmit: () => void;
}

const FoodItemForm = ({
  name,
  setName,
  price,
  setPrice,
  image,
  setImage,
  onClose,
  handleSubmit,
}: Props) => {
  return (
    <>
      <button onClick={onClose}>X</button>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(+e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="image link"
        value={image}
        onChange={(e) => setImage(e.currentTarget.value)}
      />
      <button onClick={handleSubmit}>submit</button>
    </>
  );
};

export default FoodItemForm;
