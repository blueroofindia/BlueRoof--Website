import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useState } from 'react';

export default function ListingItem({ listing }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getPriceRange = () => {
    return `₹${listing.regularPrice.range}`;
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return isExpanded ? text : `${text.slice(0, maxLength)}...`;
  };

  return (
    <Link 
      to={`/property/${listing._id}`}
      className="block w-full h-full"
    >
      <div className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full'>
        <div className='relative w-full md:aspect-[4/3] aspect-[16/9]'>
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className='absolute inset-0 h-full w-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>
        <div className='p-3 sm:p-4'>
          <h3 className='text-base sm:text-lg font-semibold truncate'>{listing.name}</h3>
          <div className='flex items-center gap-1 text-gray-600 text-xs sm:text-sm mt-1'>
            <FaMapMarkerAlt className='text-[#FF5A3D] flex-shrink-0' />
            <p className='truncate'>{listing.address}</p>
          </div>
          
          {/* Description with Read More */}
          <div className='mt-2 mb-3'>
            <p className='text-xs sm:text-sm text-gray-600'>
              {truncateDescription(listing.description)}
              {listing.description.length > 150 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(!isExpanded);
                  }}
                  className='text-[#FF5A3D] ml-1 hover:underline'
                >
                  {isExpanded ? 'Read Less' : 'Read More...'}
                </button>
              )}
            </p>
          </div>
          
          {/* Room Types */}
          <div className='flex flex-wrap gap-2 mb-3'>
            {listing.rooms.map(room => (
              <span 
                key={room}
                className='text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600'
              >
                {room}
              </span>
            ))}
          </div>

          <div className='flex justify-between items-center gap-2'>
            <p className='font-semibold text-[#FF5A3D] text-sm sm:text-base whitespace-nowrap'>
              {getPriceRange()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
