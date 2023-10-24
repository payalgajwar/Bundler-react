import { LOGO_URL } from "../utils/constants";
import { useContext, useState } from "react";
import AboutUs from "./AboutUs";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [login, setLogin] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between border-4 border-black shadow-lg shadow-grey m-2 rounded-lg">
      <div className="logo-container">
        <img className="w-60 bg-blue-100" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex mr-8 p-4 font-bold text-lg list-none">
          <li className="px-4">Online Status: {onlineStatus ? "🟢" : "🔴"}</li>
          {/* <li>onlineStatus: {onlineStatus ? "On" : "off"}</li> */}
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/Grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart - ({cartItems.length} items)</Link>
          </li>
          <button
            className="login-btn"
            onClick={() => {
              login === "Login" ? setLogin("Logout") : setLogin("Login");
            }}
          >
            {" "}
            {login}
          </button>
          <li className="px-4 font-bold">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
