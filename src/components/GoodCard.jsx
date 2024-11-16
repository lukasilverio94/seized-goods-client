/* eslint-disable react/prop-types */
import ImageSlider from "./ImageSlider";
import { Link } from "react-router-dom";

function GoodCard({ good, category, expanded }) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 ${
        expanded ? "max-w-2xl p-6" : "block"
      }`}
    >
      {expanded ? (
        <ImageSlider images={good.images} />
      ) : (
        <ImageSlider images={good.images} />
      )}
      <Link to={`/goods/${good.id}`}>
        <div className={`p-4 ${expanded ? "" : "block"}`}>
          <h3
            className={`${
              expanded ? "text-2xl" : "text-lg"
            } font-semibold text-gray-800`}
          >
            {good.name}
          </h3>
          <p className="text-gray-600 mt-2">{good.description}</p>
          <p className="text-gray-500 text-sm">
            <span className="font-semibold">Category</span>: {category.name}
          </p>
          <p className="text-blue-600 font-bold mt-4">Value: ${good.value}</p>
        </div>
      </Link>
    </div>
  );
}

export default GoodCard;
