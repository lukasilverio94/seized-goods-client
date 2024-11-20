import { useEffect, useState } from "react";
import axios from "axios";
import GoodCard from "../components/GoodCard";
import { Link } from "react-router-dom";

function SeizedGoodsList() {
  const [goods, setGoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get("/api/v1/seized-goods");
        setGoods(response.data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch goods");
      }
    };
    fetchGoods();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between ">
        <h2 className="text-5xl font-semibold text-gray-700 mb-4">
          List of Seized Goods
        </h2>
        <Link to="/create-good">
          <button className="bg-indigo-500 text-white p-2 mr-4 rounded-md">
            Register Item
          </button>
        </Link>
      </div>
      {!goods || goods.length <= 0 ? (
        <p className="text-gray-500">No goods at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {goods.map((good) => (
            <GoodCard key={good.id} good={good} category={good.category} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SeizedGoodsList;
