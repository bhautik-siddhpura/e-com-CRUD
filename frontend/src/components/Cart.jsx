import React from "react";

function Cart({ cartItems, onRemove, onUpdateQuantity }) {
const totalPrice = cartItems.reduce(
(total, item) => total + item.price * item.quantity,
0
);

const totalItems = cartItems.reduce(
(total, item) => total + item.quantity,
0
);

return ( <div className="cart-container"> <h2>Shopping Cart ({totalItems} items)</h2>

  {cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      {cartItems.map((item) => (
        <div className="cart-item" key={item._id}>
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              width="80"
            />
          )}

          <div>
            <h3>{item.name}</h3>

            <p>Price: ₹{item.price}</p>

            <p>
              Subtotal: ₹{item.price * item.quantity}
            </p>

            <button
              onClick={() =>
                onUpdateQuantity(item._id, item.quantity - 1)
              }
              disabled={item.quantity <= 1}
            >
              -
            </button>

            <span> {item.quantity} </span>

            <button
              onClick={() =>
                onUpdateQuantity(item._id, item.quantity + 1)
              }
            >
              +
            </button>

            <button onClick={() => onRemove(item._id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <hr />

      <h2>Total Price: ₹{totalPrice.toLocaleString("en-IN")}</h2>
    </>
  )}
</div>

);
}

export default Cart;
