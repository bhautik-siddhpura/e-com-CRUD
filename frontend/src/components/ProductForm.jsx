import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  price: "",
  description: "",
  category: "",
  image: "",
};

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: String(editingProduct.price),
        description: editingProduct.description || "",
        category: editingProduct.category,
        image: editingProduct.image || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onSubmit({
      ...formData,
      price: Number(formData.price),
    });

    setFormData(initialForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Update Product" : "Add Product"}</h2>

      <input
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        name="price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <input
        name="image"
        type="url"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Product description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>

      {editingProduct && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;