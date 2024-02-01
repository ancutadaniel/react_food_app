import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import useHttp from "../hooks/useHttp";
import { useCartContext } from "../store/CartContex";
import { useUserProgressContext } from "../store/UserProgresContext";
import { currencyFormater } from "../utils/formating";
import Error from "./Error";

const url = "http://localhost:3000/orders";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout = () => {
  const { items, clearCart } = useCartContext();
  const { progress, hideCheckout } = useUserProgressContext();

  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    url,
    requestConfig
  );

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleClose = () => {
    hideCheckout();
  };

  const handleFinishCheckout = () => {
    hideCheckout();
    clearCart();
    clearData();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: data,
        },
      })
    );
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinishCheckout}>
        <h2>Order Sent Successfully</h2>
        <p>We will get in touch with you as soon as your order is ready.</p>
        <p className="modal-actions">
          <Button onClick={handleFinishCheckout}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormater(totalAmount)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to send order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};
export default Checkout;
