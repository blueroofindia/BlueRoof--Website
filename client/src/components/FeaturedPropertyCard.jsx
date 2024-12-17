import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ContactPopup from './ContactPopup';

export default function FeaturedPropertyCard({ property }) {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleContactClick = (e) => {
    e.preventDefault();
    setIsContactPopupOpen(true);
  };

  const toggleDetails = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className='bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl'>
        <Link to={`/property/${property._id}`}>
          <div className='relative h-64'>
            <img 
              src={property.imageUrls[0]}
              alt={property.name}
              className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
            />
          </div>
          <div className='p-6 bg-[#0A0B2E] text-white'>
            <h3 className='text-2xl font-bold mb-2'>{property.name}</h3>
            <div className='flex items-center gap-2 text-gray-300 mb-2'>
              <FaMapMarkerAlt className='text-[#FF5A3D]' />
              <p>{property.address}</p>
            </div>
            <p className='text-sm text-gray-300 mb-4 line-clamp-2'>
              {property.description}
            </p>
            <div className='flex items-center justify-between mb-4'>
              <p className='text-2xl font-bold text-[#FF5A3D]'>
                ₹{(property.regularPrice / 10000000).toFixed(2)} Cr
              </p>
              <div className='flex gap-2 text-sm'>
                <span className='text-gray-300'>{property.bedrooms} beds</span>
                <span className='text-gray-300'>•</span>
                <span className='text-gray-300'>{property.bathrooms} baths</span>
              </div>
            </div>
            
            {/* Property Details Section */}
            <div className={`transition-all duration-300 overflow-hidden ${showDetails ? 'max-h-96' : 'max-h-0'}`}>
              <div className='pt-4 border-t border-gray-700'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                  <div>
                    <p className='text-gray-400'>Area</p>
                    <p className='text-white'>{property.area}</p>
                  </div>
                  <div>
                    <p className='text-gray-400'>Furnished</p>
                    <p className='text-white'>{property.furnished}</p>
                  </div>
                </div>
                <div className='mt-4'>
                  <p className='text-gray-400 mb-2'>Amenities</p>
                  <div className='flex flex-wrap gap-2'>
                    {property.amenities.map((amenity, index) => (
                      <span 
                        key={index}
                        className='bg-gray-700 text-white text-xs px-2 py-1 rounded'
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex gap-4 mt-4'>
              <button
                onClick={toggleDetails}
                className='flex-1 bg-[#FF5A3D] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm'
              >
                {showDetails ? 'Show Less' : 'View Details'}
              </button>
              <button
                onClick={handleContactClick}
                className='flex-1 bg-slate-700 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm'
              >
                Contact
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Contact Popup */}
      {isContactPopupOpen && (
        <ContactPopup onClose={() => setIsContactPopupOpen(false)} />
      )}
    </>
  );
}
