import React from 'react';

const Card = ({ image, title, description, price, details }) => {
  return (
    <div className="relative w-full max-w-[1100px] md:flex rounded-lg shadow-lg overflow-hidden bg-gradient-to-r from-[#0a0a40] to-[#0a0a40]">
      {/* Image Section */}
      <div
        className="md:w-1/2 h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* Text Content Section */}
      <div className="md:w-1/2 p-16 flex flex-col justify-between text-white">
        <div>
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-white mb-4">{description}</p>
          <p className="text-lg font-semibold mb-4 text-[#ff6a35]">{price}</p>
          <p className="text-gray-200">{details}</p>
        </div>
        <button className="mt-8 px-8 py-4 bg-[#ff6a35] text-[#0a0a40] text-lg rounded hover:bg-[#e45a29]">
          Contact
        </button>
      </div>
    </div>
  );
};

export default Card;
