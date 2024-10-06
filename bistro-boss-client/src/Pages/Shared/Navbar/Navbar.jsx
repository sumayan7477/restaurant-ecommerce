import { Link } from "react-router-dom";
import logo from "../../../assets/logoo.png";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../Hooks/useCart";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  console.log(isAdmin);
  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navoptions = (
    <>
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/">CONTACT US</Link>
      </li>
      <li>
        <Link to="/menu">OUR MENU</Link>
      </li>
      <li>
        <Link to="/order/salad">OUR SHOP</Link>
      </li>
      {
        user && isAdmin && (
          <li>
            <Link to="/dashbord/adminHome">DASHBORD</Link>
          </li>
        )
      }
      {user && !isAdmin && (
        <li>
          <Link to="/dashbord/userHome">DASHBORD</Link>
        </li>
      )}
      
      <li>
        <Link to="/dashbord/cart">
          <button className="text-white flex">
            <FaCartShopping className="text-xl" />
            <div className="badge ">+{cart.length}</div>
          </button>
        </Link>
      </li>

      {user ? (
        <>
          {/* <span>{user?.displayName}</span> */}
          <button onClick={handleLogout} className="btn btn-ghost uppercase">
            Logout
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar fixed z-10 bg-opacity-15 bg-slate-900 justify-between max-w-screen-xl text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu  dropdown-content  rounded-box z-[1] mt-3  p-2 shadow"
          >
            {navoptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img className="w-2/3" src={logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex justify-between">
        <ul className="menu menu-horizontal px-1">{navoptions}</ul>
      </div>
    </div>
  );
};

export default Navbar;
