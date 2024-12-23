import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaParking, FaWhatsapp, FaYoutube, FaInstagram, FaSwimmingPool, FaDumbbell, FaTree, FaChild, FaHome, FaShieldAlt, FaFilm, FaHotTub, FaConciergeBell, FaHelicopter, FaBed, FaRulerCombined, FaCouch, FaBuilding, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { BiBuildingHouse, BiBed, BiArea, BiIdCard, BiBuildings, BiTime, BiCalendar, BiMapAlt } from 'react-icons/bi';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import { useEffect, useState } from 'react';
import { allListings } from '../data/propertyData';
import Footer from '../components/Footer';

// Icon mapping for specifications
const specIconMap = {
  'BHK': FaBed,
  'Built-up Area': FaRulerCombined,
  'Furnished': FaCouch,
  'Floor': FaBuilding,
  'Age of Construction': FaClock,
  'Available From': FaCalendarAlt
};

// Icon mapping for amenities
const amenityIconMap = {
  'Swimming Pool': FaSwimmingPool,
  'Gym': FaDumbbell,
  'Garden': FaTree,
  'Club House': FaHome,
  'Security': FaShieldAlt,
  'Children Playing Area': FaChild
};

const iconComponents = {
  BiBed,
  BiArea,
  BiIdCard,
  BiBuildings,
  BiTime,
  BiCalendar,
  BiMapAlt
};

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  SwiperCore.use([Navigation, Pagination, Autoplay]);

  // Get property data based on ID
  useEffect(() => {
    const foundProperty = allListings.find(p => p._id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      // If property not found, redirect to explore page
      navigate('/explore');
    }
  }, [id, navigate]);

  if (!property) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-hidden">
        {/* Image Slider */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
          <div className="w-full relative">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="h-[300px] md:h-[400px] lg:h-[500px]"
            >
              {property.imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full md:aspect-[4/3] aspect-[16/9]">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Property Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{property.name}</h1>
              <p className="text-gray-600 flex items-center gap-2 mt-2 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-[#FF5A3D] flex-shrink-0" />
                {property.address}
              </p>
            </div>
            <div className="w-full sm:w-auto text-left sm:text-right">
              <p className="text-xl sm:text-2xl font-bold text-[#FF5A3D]">
                ₹{(property.regularPrice / 10000000).toFixed(2)} Cr
              </p>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <a
              href={`https://wa.me/7738434767?text=Hi,%20I'm%20interested%20in%20the%20property%20${encodeURIComponent(property.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              <FaWhatsapp className="text-xl flex-shrink-0" />
              Contact on WhatsApp
            </a>
            <a
              href="https://www.youtube.com/@blueroofindia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              <FaYoutube className="text-xl flex-shrink-0" />
              Watch Video Tour
            </a>
            <a
              href="https://www.instagram.com/blueroofindia?igsh=MWpyYWw4Mm5iZ2lscQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-3 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              <FaInstagram className="text-xl flex-shrink-0" />
              Follow on Instagram
            </a>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Description */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className={`text-gray-600 ${!showFullDescription && 'line-clamp-3'}`}>
                {property.description}
              </p>
              <button 
                onClick={toggleDescription}
                className="text-blue-600 hover:text-blue-800 mt-2 font-medium"
              >
                {showFullDescription ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Quick Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BiBuildingHouse className="text-[#FF5A3D] text-xl sm:text-2xl flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Developer</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{property.developer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#FF5A3D] text-xl sm:text-2xl flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Location</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{property.location}, {property.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaParking className="text-[#FF5A3D] text-xl sm:text-2xl flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Parking</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{property.parking}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.specifications.map((spec, index) => {
              const IconComponent = iconComponents[spec.icon];
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-blue-600 text-xl">
                    <IconComponent />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{spec.label}</p>
                    <p className="font-medium">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {property.amenities.map((amenity, index) => {
              const IconComponent = amenityIconMap[amenity];
              return (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-[#FF5A3D] text-xl">
                    <IconComponent />
                  </div>
                  <span className="font-medium">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
