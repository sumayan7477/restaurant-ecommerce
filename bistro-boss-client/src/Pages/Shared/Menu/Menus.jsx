import { Link } from "react-router-dom";
import MenuItems from "../../Shared/MenuItems/MenuItems";
const Menus = ({items,title}) => {
  console.log(items);
  items.map(item=>console.log(item))

    return (
      <div className="w-3/4 flex flex-col items-center gap-10 mx-auto my-24">
        
        <div className="grid md:grid-cols-2 gap-6 mt-4 ">
          {
              items.map(item =><MenuItems key={item._id} item={item}></MenuItems>)
          }
        </div>
        <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4 mt-4    ">ORDER YOUR FAVOURITE FOOD</button></Link>
        
      </div>
    );
};

export default Menus;