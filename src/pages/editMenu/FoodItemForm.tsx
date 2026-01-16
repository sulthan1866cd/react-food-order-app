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
    <div className="food-item-form">
      <div className="form-header">
        <h3 className="form-title">Add Food Item</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter food name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price (₹)</label>
        <input
          id="price"
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(+e.currentTarget.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.currentTarget.files?.[0] ?? null)}
        />
      </div>

      <div className="form-actions">
        <button className="submit-btn" onClick={handleSubmit}>submit</button>
      </div>
    </div>
  );
};

export default FoodItemForm;
