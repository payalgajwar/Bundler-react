import RestaurantCard, { withPromotedlabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import RestaurantMenu from "./RestaurantMenu";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

const Body = () => {
  // State Variable - Super powerful variable
  const [listOfRestuarants, setListOfRestuarants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardPromoted = withPromotedlabel(RestaurantCard);

  // Whenever state variables update, react triggers a reconciliation cycle (re-renders the component)
  // console.log("Body Rendered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.5940947&lng=85.1375645&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // Optional Chaining
    const restaurantData = await json?.data?.cards[2]?.card?.card?.gridElements
      ?.infoWithStyle?.restaurants;
    setListOfRestuarants(restaurantData);
    setFilteredRestaurant(restaurantData);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection.
      </h1>
    );
  }

  const { loggedInUser, setUserName } = useContext(UserContext);

  return listOfRestuarants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="py-8 px-2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ">
      <div className="filter flex">
        <div className="search py-2">
          <input
            type="text"
            className="border-black border-2 px-2"
            placeholder="search your resturant..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <button
            className="px-2 border-black border-2 bg-blue-200"
            onClick={() => {
              const filteredRestaurant = listOfRestuarants.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>

        <div className="mx-8 flex items-center">
          <button
            className="px-4 py-0 bg-blue-100 rounded-lg border-2 border-black "
            onClick={() => {
              const filteredList = filteredRestaurant.filter(
                (res) => res.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="flex items-center">
          <label className="bg-blue-100 border border-black px-2">
            UserName :{" "}
          </label>
          <input
            className="border border-black px-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap my-4">
        {filteredRestaurant.map((restaurant) => (
          // <RestaurantCard key={restaurant?.info?.id} resData={restaurant?.info} />
          <Link
            key={restaurant?.info?.id}
            to={"/restaurants/" + restaurant?.info?.id}
          >
            {/* {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : ( */}
            <RestaurantCard resData={restaurant?.info} />
            {/* ) */}
            {/* } */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
