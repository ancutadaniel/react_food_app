import Button from "../UI/Button";
import logo from "../assets/logo.jpg";
import { useCartContext } from "../store/CartContex";
import { useUserProgressContext } from "../store/UserProgresContext";

const Header = () => {
  const { items } = useCartContext();
  const { showCart } = useUserProgressContext();

  const totalCartItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="React Food Logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button onClick={showCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
