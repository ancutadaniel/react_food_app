import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useCartContext } from "../store/CartContex";
import { useUserProgressContext } from "../store/UserProgresContext";
import { currencyFormater } from "../utils/formating";
import CartItem from "./CartItem";

const Cart = () => {
  const { items, addItem, removeItem } = useCartContext();
  const { progress, hideCart, showCheckout } = useUserProgressContext();

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleHideCart = () => {
    hideCart();
  };

  const handleShowCheckout = () => {
    showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleHideCart : null}
    >
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormater(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleHideCart} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleShowCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
