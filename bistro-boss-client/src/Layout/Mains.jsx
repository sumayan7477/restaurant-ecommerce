import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Mains = () => {
  // hide headwer fooetr in signup and login 
  const location = useLocation();
  console.log(location);
  const noHeaderFooter = location.pathname.includes('login')||location.pathname.includes('signup')
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Mains;
