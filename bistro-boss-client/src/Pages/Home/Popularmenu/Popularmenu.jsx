import { useEffect } from "react";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";
import { useState } from "react";
import MenuItems from "../../Shared/MenuItems/MenuItems";

const Popularmenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === "popular");
        setMenu(popularItems);
      });
  }, []);
  return (
    <div className="w-3/4 flex flex-col items-center mx-auto my-24">
      <SectionTItle
        subHeading={"Check ii Out"}
        heading={"from our menu"}
      ></SectionTItle>
      <div className="grid md:grid-cols-2 gap-6 mt-4 ">
        {
            menu.map(item =><MenuItems key={item._id} item={item}></MenuItems>)
        }
      </div>
      <button className="btn btn-outline border-0 border-b-4 mt-4  ">Full Menu</button>
      
    </div>
  );
};

export default Popularmenu;
