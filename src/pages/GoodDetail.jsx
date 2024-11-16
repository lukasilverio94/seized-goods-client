import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import GoodCard from "../components/GoodCard";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function GoodDetail() {
  const { id } = useParams();
  const [good, setGood] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGood = async () => {
      try {
        const response = await axios.get(`/api/v1/seized-goods/${id}`);
        setGood(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch good details");
      }
    };
    fetchGood();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!good) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <GoodCard good={good} category={good.category} expanded />
      <Link to="/goods">
        <Button text={"Back"} />
      </Link>
    </div>
  );
}

export default GoodDetail;
