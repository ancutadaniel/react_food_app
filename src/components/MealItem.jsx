import Button from "../UI/Button";
import { useCartContext } from "../store/CartContex";
import { currencyFormater } from "../utils/formating";

const MealItem = ({ meal }) => {
  const { addItem } = useCartContext();

  const handleAddMealToCart = () => addItem(meal);

  return (
    <li key={meal.id} className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormater(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
