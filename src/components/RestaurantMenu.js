import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[0]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;
  // console.log("card", itemCards);
  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    return (
        <div className="mt-10 text-center">
          <h1 className="font-bold text-2xl my-5">{name}</h1>
          <p>
            {cuisines.join(", ")} - {costForTwoMessage}
          </p>
          {/* <h1>Menu</h1> */}
    
          {categories.map((category, index) => (
            // <RestaurantCategory data={category?.card?.card}/>
            <RestaurantCategory
              key={category?.card?.card?.title}
              data={category?.card?.card}
              showItems={index === showIndex ? true : false}
              setShowIndex={() =>
                index == showIndex ? setShowIndex(!index) : setShowIndex(index)
              }
            />
          ))}
    </div>
  );
};

export default RestaurantMenu;