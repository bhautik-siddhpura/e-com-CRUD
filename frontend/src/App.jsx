import { useEffect, useState } from "react";

import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

import {
getProducts,
createProduct,
updateProduct,
deleteProduct,
} from "./services/productService";

import "./index.css";

function App() {
const [products, setProducts] = useState([]);
const [cartItems, setCartItems] = useState([]);
const [showCart, setShowCart] = useState(false);

const [editingProduct, setEditingProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const loadProducts = async () => {
try {
setError("");

  const data = await getProducts();

  setProducts(data);
} catch (error) {
  setError("Failed to load products. Check the backend server.");
} finally {
  setLoading(false);
}

};

useEffect(() => {
loadProducts();
}, []);

// ADD OR INCREASE CART ITEM
const handleAddToCart = (product) => {
setCartItems((previousItems) => {
const existingItem = previousItems.find(
(item) => item._id === product._id
);

  if (existingItem) {
    return previousItems.map((item) =>
      item._id === product._id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...previousItems, { ...product, quantity: 1 }];
});

};

// REMOVE CART ITEM
const handleRemoveFromCart = (id) => {
setCartItems((previousItems) =>
previousItems.filter((item) => item._id !== id)
);
};

// UPDATE QUANTITY
const handleUpdateQuantity = (id, quantity) => {
if (quantity < 1) return;

setCartItems((previousItems) =>
  previousItems.map((item) =>
    item._id === id ? { ...item, quantity } : item
  )
);

};

// CREATE OR UPDATE PRODUCT
const handleSubmit = async (productData) => {
try {
setError("");

  if (editingProduct) {
    await updateProduct(editingProduct._id, productData);
    setEditingProduct(null);
  } else {
    await createProduct(productData);
  }

  await loadProducts();
} catch (error) {
  setError(
    error.response?.data?.message || "Failed to save product."
  );
}

};

// DELETE PRODUCT
const handleDelete = async (id) => {
if (!window.confirm("Are you sure you want to delete this product?")) {
return;
}

try {
  setError("");

  await deleteProduct(id);

  // Also remove the product from the cart.
  setCartItems((previousItems) =>
    previousItems.filter((item) => item._id !== id)
  );

  await loadProducts();
} catch (error) {
  setError(
    error.response?.data?.message || "Failed to delete product."
  );
}

};

// TOTAL NUMBER OF CART ITEMS
const cartCount = cartItems.reduce(
(total, item) => total + item.quantity,
0
);

return ( <div className="container"> <h1>MERN E-commerce</h1>

  <button
    className="cart-button"
    onClick={() => setShowCart(!showCart)}
  >
    🛒 Cart ({cartCount})
  </button>

  {error && <p className="error">{error}</p>}

  {showCart ? (
    <>
      <button onClick={() => setShowCart(false)}>
        Continue Shopping
      </button>

      <Cart
        cartItems={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </>
  ) : (
    <>
      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  )}
</div>

);
}

export default App;
