import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";
import bann from "../../assets/menu/banner3.jpg";
import des from "../../assets/menu/dessert-bg.jpeg";
import pizz from "../../assets/menu/pizza-bg.jpg";
import sala from "../../assets/menu/salad-bg.jpg";
import soupim from "../../assets/menu/soup-bg.jpg";
import Menus from "../Shared/Menu/Menus";
import UseMenu from "../../Hooks/UseMenu";



const Menu = () => {
  const [menu] = UseMenu();
 
  console.log(menu);
  const dessert = menu.filter(item=>(item.category ==='dessert'));
  const pizza = menu.filter(item=>(item.category ==='pizza'));
  const salad = menu.filter(item=>(item.category ==='salad'));
  const soup = menu.filter(item=>(item.category ==='soup'));
  const offered = menu.filter(item=>(item.category ==='offered'));
  console.log(dessert, pizza,salad,soup,offered);

  

  return (
    <div>
      <Helmet>
        <title>Bistro | Menu</title>
      </Helmet>
      <Cover
        img={bann}
        title={"our menu"}
        text={" Provident cupiditate voluptatem et in."}
      ></Cover>
      <Menus items={offered} title={'offered'}></Menus>
      <Cover
        img={des}
        title={"desert"}
        text={" Provident cupiditate voluptatem et in."}
      ></Cover>
      <Menus items={dessert} title={'dessert'} ></Menus>
      <Cover
        img={pizz}
        title={"pizza"}
        text={" Provident cupiditate voluptatem et in."}
      ></Cover>
      <Menus items={pizza} title={'pizza'}></Menus>
      <Cover
        img={sala}
        title={"saladh"}
        text={" Provident cupiditate voluptatem et in."}
      ></Cover>
      <Menus items={salad} title={'salad'}></Menus>
      <Cover
        img={soupim}
        title={"soup"}
        text={" Provident cupiditate voluptatem et in."}
      ></Cover>
      <Menus items={soup} title={'soup'}></Menus>
    </div>
  );
};

export default Menu;
