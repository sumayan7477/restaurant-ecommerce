import { createBrowserRouter } from "react-router-dom";
import Mains from "../Layout/Mains";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Secrate from "../Pages/Shared/Secrate/Secrate";
import PrivateRouts from "./PrivateRouts";
import DashbordMain from "../Layout/DashbordMain";
import Cart from "../Pages/Dashbord/Cart/Cart";
import UserHome from "../Pages/Dashbord/Home/UserHome";
import AllUsers from "../Pages/Dashbord/AllUsers/AllUsers";
import AddItems from "../Pages/Dashbord/AddItems/AddItems";
import AdminRouts from "./AdminRouts";
import ManageItems from "../Pages/Dashbord/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashbord/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashbord/Payment/Payment";
import PaymentHisory from "../Pages/Dashbord/PaymentHisory/PaymentHisory";
import AdminHome from "../Pages/Dashbord/AdminHome/AdminHome";
import UserHomeDash from "../Pages/Dashbord/UserHome/UserHome";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mains></Mains>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/contect",
        element: <Menu></Menu>,
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/dashbord",
        element: <Menu></Menu>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/secrate",
        element: (
          <PrivateRouts>
            <Secrate></Secrate>
          </PrivateRouts>
        ),
      },
    ],
  },
  {
    path: "/dashbord",
    element: (
      <PrivateRouts>
        <DashbordMain></DashbordMain>
      </PrivateRouts>
    ),
    children: [
      {
        path: "userHome",
        element:<UserHomeDash></UserHomeDash> ,
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "payment",
        element: <Payment></Payment> ,
      },
      {
        path: "paymentHisory",
        element: <PaymentHisory></PaymentHisory> ,
      },
      
      // admin routes
      {
        path: "adminHome",
        element:<AdminRouts><AdminHome></AdminHome></AdminRouts> ,
      },
      {
        path: "allusers",
        element:<AdminRouts><AllUsers></AllUsers></AdminRouts> ,
      },
      {
        path: "additems",
        element:<AdminRouts><AddItems></AddItems></AdminRouts> ,
      },
      {
        path: "manageitems",
        element:<AdminRouts><ManageItems></ManageItems></AdminRouts> ,
      },
      {
        path: "updateItem/:id",
        element:<AdminRouts><UpdateItem></UpdateItem></AdminRouts> ,
        loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
      },
    ],
  },
]);
