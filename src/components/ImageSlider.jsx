/* eslint-disable react/prop-types */
import { useState } from "react";

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      {images && images.length > 0 ? (
        <div>
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].altText || "Seized Good Image"}
            className="w-full h-48 object-cover rounded-lg" // Ensures consistent size
          />
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
              >
                ›
              </button>
            </>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 p-4">No images available</p>
      )}
    </div>
  );
}

export default ImageSlider;
