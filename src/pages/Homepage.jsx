import { Link } from "react-router-dom";
import SeizedGoodsList from "../pages/SeizedGoodsList";
function Homepage() {
  return (
    <div>
      <h1 className="text-4xl text-center m-3">
        Welcome to Seized Goods Management
      </h1>
      {/* <Link to="/goods">
        <button>List Goods</button>
      </Link> */}
      <SeizedGoodsList />
      <Link to="/create-good">
        <button>Create a Good</button>
      </Link>
    </div>
  );
}

export default Homepage;
