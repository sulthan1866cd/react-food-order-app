import { type Dispatch, type SetStateAction } from "react";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  setImage: Dispatch<SetStateAction<File | null>>;

  onClose: () => void;
  handleSubmit: () => void;
}

const FoodItemForm = ({
  name,
  setName,
  price,
  setPrice,
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
        type="file"
        placeholder="image link"
        onChange={(e) => setImage(e.currentTarget.files?.[0] ?? null)}
      />
      <button onClick={handleSubmit}>submit</button>
    </>
  );
};

export default FoodItemForm;
