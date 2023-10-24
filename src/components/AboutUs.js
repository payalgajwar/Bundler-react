import { Component } from "react";
import UserClass from "./UserClass";
import User from "./User";
import UserContext from "../utils/userContext";

class AboutUs extends Component {
  constructor(props) {
    super(props);

    // console.log("Parent Constructor")
  }

  componentDidMount() {
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent Render");

    return (
      <div>
        <h1>About Class Component</h1>
        <div>
          LoggedIn User:
          <UserContext.Consumer>
            {({ loggedInUser }) => (
              <h1 className="text-xl font-bold">{loggedInUser}</h1>
            )}
          </UserContext.Consumer>
        </div>
        <h2>This is Namaste React Web Series</h2>
        <User name={"Child1 (class)"} location={"Pune Class"} />
      </div>
    );
  }
}

export default AboutUs;
