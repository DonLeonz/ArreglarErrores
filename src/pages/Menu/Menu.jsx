import coffeeItems from "../../data/coffeeItems";
import CoffeeCard from "../../components/cards/CoffeeCard/CoffeeCard";
import CoffeeModal from "../../components/modals/CoffeeModal/CoffeeModal";
import MenuHeader from "../../components/features/Menu/MenuHeader/MenuHeader";
import "./Menu.css";

const Menu = () => {
  return (
    <div className="first-child-adjustment uk-section uk-background-secondary uk-light uk-padding-small menu-section">
      <div className="uk-container uk-container-xlarge uk-padding-small uk-light">
        <MenuHeader />
        <div
          className="uk-grid-small uk-child-width-1-3@m uk-child-width-1-2@s uk-child-width-1-1@s menu-grid"
          data-uk-grid
          data-uk-height-match="target: > div > .uk-card"
        >
          {Array.isArray(coffeeItems) &&
            coffeeItems.map((item, index) => (
              <div key={index}>
                <CoffeeCard item={item} index={index} />
                <CoffeeModal item={item} index={index} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
