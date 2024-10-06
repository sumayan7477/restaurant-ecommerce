import { Link, Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/logoo.png";
import { FaCartShopping } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import useCart from "../Hooks/useCart";
import { FaBook, FaList, FaUser, FaUtensils } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import { SlWallet } from "react-icons/sl";

const DashbordMain = () => {
  const [cart] = useCart();

  // todo: get is admin value for admin
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
  return (
    <div className="flex ">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 flex flex-col items-start justify-start">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className=" drawer-button lg:hidden mb-4"
          >
            <GiHamburgerMenu className="text-2xl " />
          </label>
          <div className="w-full ">
            <Outlet></Outlet>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-orange-300 text-base-content min-h-full w-80 p-4 text-lg uppercase ">
            {/* Sidebar content here */}
            <li>
              <img src={logo} alt="" className="mb-6" />
            </li>
            <br />
            {isAdmin ? (
              <>
                <li className="hover:text-white">
                  <Link to="adminHome">
                    <IoHomeSharp /> Admin home
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="additems">
                   <FaUtensils></FaUtensils> Add Items
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="manageitems">
                    <FaList></FaList> Manage items
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="bookings">
                  <FaBook></FaBook>
                   manage bookings
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="allusers">
                  <FaUser></FaUser> all users
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-white">
                  <Link to="userHome">
                    <IoHomeSharp /> User home
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="cart">
                    <FaCartShopping /> MY CART {cart.length}
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="cart">
                    <BsCalendarDate></BsCalendarDate> Reservashion
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="paymentHisory">
                  <SlWallet /> payment Hisory
                  </Link>
                </li>
                <li className="hover:text-white">
                  <Link to="cart">
                    <FaCartShopping /> MY CART
                  </Link>
                </li>
              </>
            )}
            {/* shared navlinks */}
            <div className="divider"></div>
            <li className="hover:text-white">
              <Link to="/">
                <IoHomeSharp /> home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashbordMain;
