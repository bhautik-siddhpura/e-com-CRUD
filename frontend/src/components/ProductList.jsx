function ProductList({ products, onEdit, onDelete, onAddToCart }) {
if (products.length === 0) {
return <p>No products available.</p>;
}

return ( <div> <h2>All Products</h2>

  <div className="product-grid">
    {products.map((product) => (
      <div key={product._id} className="product-card">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            width="150"
          />
        )}

        <h3>{product.name}</h3>

        <p>Price: ₹{product.price}</p>

        <p>Category: {product.category}</p>

        <p>{product.description}</p>

        <button onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>

        <button onClick={() => onEdit(product)}>
          Edit
        </button>

        <button onClick={() => onDelete(product._id)}>
          Delete
        </button>
      </div>
    ))}
  </div>
</div>

);
}

export default ProductList;
