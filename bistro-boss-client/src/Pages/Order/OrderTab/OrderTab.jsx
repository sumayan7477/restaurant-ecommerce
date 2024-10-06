import Foodcard from "../../Shared/FoodCard/Foodcard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-3 gap-3 my-10 justify-center">
      {items.map((item) => (
        <Foodcard key={item._id} item={item}></Foodcard>
      ))}
    </div>
  );
};

export default OrderTab;
