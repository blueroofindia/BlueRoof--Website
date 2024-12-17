import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaSearch, FaMapMarkerAlt, FaRegBuilding, FaHandshake } from 'react-icons/fa';
import { BsHouseDoor, BsBuilding } from 'react-icons/bs';
import Footer from '../components/Footer'; // Add Footer component import
import ContactPopup from '../components/ContactPopup'; // Add ContactPopup component import
import { featuredProperties } from '../data/featuredProperties';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false); // Add state for ContactPopup
  SwiperCore.use([Navigation]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/explore?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    if (location.state?.scrollToFeatured) {
      document.getElementById('featured-properties')?.scrollIntoView({ behavior: 'smooth' });
      // Clear the state to prevent scrolling on subsequent renders
      navigate('/', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (location.state?.scrollToNews) {
      document.getElementById('news-section')?.scrollIntoView({ behavior: 'smooth' });
      // Clear the state
      navigate('/', { state: {}, replace: true });
    }
  }, [location.state?.scrollToNews, navigate]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerRes, saleRes, rentRes] = await Promise.all([
          fetch('/api/listing/get?offer=true&limit=4'),
          fetch('/api/listing/get?type=sale&limit=4'),
          fetch('/api/listing/get?type=rent&limit=4')
        ]);

        if (!offerRes.ok || !saleRes.ok || !rentRes.ok) {
          console.error('Failed to fetch listings');
          return;
        }

        const [offerData, saleData, rentData] = await Promise.all([
          offerRes.json(),
          saleRes.json(),
          rentRes.json()
        ]);

        setOfferListings(offerData || []);
        setSaleListings(saleData || []);
        setRentListings(rentData || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-[#F0F7FF]">
      {/* Hero Section */}
      <div className="relative bg-[#F0F7FF] pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 capitalize">
                Crafted For Those Who Seek The Best!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Explore Properties, Projects, And Locations To Suit Your Lifestyle. Find Your Perfect Home With BlueRoof.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto sm:mx-0">
                <input
                  type="text"
                  placeholder="Find your ideal property, project, or location..."
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5A3D] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF5A3D] text-white p-2 rounded-full hover:bg-[#FF4A2D] transition-colors"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className='block md:hidden w-full max-w-md mx-auto'>
              <img 
                src='/src/assets/hero.png' 
                alt='Real Estate'
                className='w-full h-auto'
              />
            </div>
            <div className='hidden md:block'>
              <img 
                src='/src/assets/hero.png' 
                alt='Real Estate'
                className='w-full h-auto'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className='bg-[#F0F7FF] py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Swiper
            navigation
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            className='rounded-2xl overflow-hidden'
          >
            <SwiperSlide>
              <div className='relative w-full h-[300px] md:h-[600px]'>
                <img 
                  src={new URL('../assets/1.jpg', import.meta.url).href}
                  alt='Luxury Home'
                  className='absolute inset-0 w-full h-full object-cover object-center'
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='relative w-full h-[300px] md:h-[600px]'>
                <img 
                  src={new URL('../assets/2.jpg', import.meta.url).href}
                  alt='Modern Apartment'
                  className='absolute inset-0 w-full h-full object-cover object-center'
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='relative w-full h-[300px] md:h-[600px]'>
                <img 
                  src={new URL('../assets/3.jpg', import.meta.url).href}
                  alt='Beachfront Property'
                  className='absolute inset-0 w-full h-full object-cover object-center'
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='relative w-full h-[300px] md:h-[600px]'>
                <img 
                  src={new URL('../assets/4.jpg', import.meta.url).href}
                  alt='Luxury Penthouse'
                  className='absolute inset-0 w-full h-full object-cover object-center'
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div id="featured-properties" className='bg-[#F0F7FF] py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>Featured Properties</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {featuredProperties.map((property) => (
              <Link to={`/property/${property._id}`} key={property._id}>
                <div className='bg-white rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105'>
                  <div className='relative h-64'>
                    <img 
                      src={property.imageUrls[0]}
                      alt={property.name}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='p-6 bg-[#0A0B2E] text-white'>
                    <h3 className='text-2xl font-bold mb-2'>{property.name}</h3>
                    <p className='flex items-center gap-2 text-gray-300 mb-2'>
                      <span className='inline-block'>📍</span> {property.address}
                    </p>
                    <p className='text-sm text-gray-300 mb-4 line-clamp-2'>
                      {property.description}
                    </p>
                    <div className='flex items-center justify-between'>
                      <p className='text-2xl font-bold text-[#FF5A3D]'>₹{(property.regularPrice / 10000000).toFixed(2)} Cr</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Signature Property Section */}
      <div className='bg-[#F0F7FF] py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>Signature property</h2>
          {/* <p className='text-blue-600 mb-8 hover:underline cursor-pointer'>Show more places ready to move</p> */}
          
          {/* Signature Property Card */}
          <div className='bg-white rounded-2xl overflow-hidden shadow-xl'>
            <div className='grid md:grid-cols-2'>
              <div className='relative h-[300px] md:h-full'>
                <img 
                  src='/assets/Properties Images/AaradhyaAvaan/AaradhyaAvaan01.jpg'
                  alt='Signature Property'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='bg-[#0A0B2E] text-white p-8 flex flex-col justify-between'>
                <div>
                  <h3 className='text-3xl font-bold mb-2'>MICL Aaradhya Avaan</h3>
                  <p className='text-gray-300 mb-4'>Tardeo, Mumabai</p>
                  <p className='text-[#FF5A3D] text-2xl font-bold mb-4'>7.99 Cr - 18.49 Cr</p>
                  <p className='text-xl mb-6'>3, 4 BHK Apartments</p>
                </div>
                <button
                  onClick={() => setIsContactPopupOpen(true)}
                  className='bg-[#FF5A3D] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all text-lg font-semibold w-full md:w-auto'
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Popup */}
      <ContactPopup 
        isOpen={isContactPopupOpen} 
        onClose={() => setIsContactPopupOpen(false)} 
      />

      {/* Featured Developers Section */}
      <div className='bg-[#F0F7FF] py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-gray-800 mb-12'>Featured Developers</h2>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Lodha Developer Card */}
            <div className='bg-white rounded-xl p-6 shadow-lg text-center'>
              <div className='w-24 h-24 mx-auto mb-4 rounded-full bg-[#FF5A3D]/10 flex items-center justify-center'>
                <img 
                  src="/assets/Lodha.png"
                  alt="Lodha"
                  className='w-16 h-16 object-contain'
                />
              </div>
              <h3 className='text-2xl font-bold mb-2'>Lodha</h3>
              <p className='flex items-center justify-center gap-2 text-gray-600 mb-3'>
                {/* <span className='inline-block'>📍</span> Kokshet Road */}
              </p>
              <p className='text-gray-600 mb-4'>
                Premium homes with world-class amenities and breathtaking views.
              </p>
              <p className='flex items-center justify-center gap-1 text-[#FF5A3D] font-medium'>
                {/* <span className='inline-block'>📍</span> Thane */}
              </p>
            </div>

            {/* Piramal Developer Card */}
            <div className='bg-white rounded-xl p-6 shadow-lg text-center'>
              <div className='w-24 h-24 mx-auto mb-4 rounded-full bg-[#FF5A3D]/10 flex items-center justify-center'>
                <img 
                  src="/assets/Piramal.png"
                  alt="Piramal"
                  className='w-16 h-16 object-contain'
                />
              </div>
              <h3 className='text-2xl font-bold mb-2'>Piramal</h3>
              <p className='flex items-center justify-center gap-2 text-gray-600 mb-3'>
                {/* <span className='inline-block'>📍</span> Lower Parel */}
              </p>
              <p className='text-gray-600 mb-4'>
                Luxury residences that redefine modern living in Mumbai.
              </p>
              <p className='flex items-center justify-center gap-1 text-[#FF5A3D] font-medium'>
                {/* <span className='inline-block'>📍</span> Mumbai */}
              </p>
            </div>

            {/* Runwal Developer Card */}
            <div className='bg-white rounded-xl p-6 shadow-lg text-center'>
              <div className='w-24 h-24 mx-auto mb-4 rounded-full bg-[#FF5A3D]/10 flex items-center justify-center'>
                <img 
                  src="/assets/Runwal.jpg"
                  alt="Runwal"
                  className='w-16 h-16 object-contain'
                />
              </div>
              <h3 className='text-2xl font-bold mb-2'>Runwal</h3>
              <p className='flex items-center justify-center gap-2 text-gray-600 mb-3'>
                {/* <span className='inline-block'>📍</span> Mulund West */}
              </p>
              <p className='text-gray-600 mb-4'>
                Affordable yet stylish homes in a vibrant community.
              </p>
              <p className='flex items-center justify-center gap-1 text-[#FF5A3D] font-medium'>
                {/* <span className='inline-block'>📍</span> Mumbai */}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News and Articles Section */}
      <section id="news-section" className='max-w-7xl mx-auto px-4 py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-4xl font-bold text-gray-800 mb-12'>Latest News and Articles</h2>
          
          <Swiper
            navigation
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={30}
            slidesPerView={1}
            className='h-[400px] rounded-2xl'
          >
            {/* Article 1 */}
            <SwiperSlide>
              <div className='grid md:grid-cols-2 h-full'>
                <img 
                  src="/assets/Firenews.png" 
                  alt="Fire Safety"
                  className='w-full h-full object-cover'
                />
                <div className='bg-white p-8'>
                  <h3 className='text-2xl font-bold mb-4'>Maharashtra issues special fire safety regulations</h3>
                  <p className='text-gray-600 mb-4'>
                    Maharashtra government on October 11, 2024 has issued final notifications to enforce fire safety norms for vulnerable buildings in Mumbai and Maharashtra.
                  </p>
                  <button className='text-[#FF5A3D] font-semibold hover:underline'>Read More →</button>
                </div>
              </div>
            </SwiperSlide>

            {/* Article 2 */}
            <SwiperSlide>
              <div className='grid md:grid-cols-2 h-full'>
                <img 
                  src="/assets/amb news.jpg" 
                  alt="Antilia"
                  className='w-full h-full object-cover'
                />
                <div className='bg-white p-8'>
                  <h3 className='text-2xl font-bold mb-4'>Everything you want to know about Mukesh Ambani's Antilia house</h3>
                  <p className='text-gray-600 mb-4'>
                    The Ambani house is the world's most expensive biggest residential property.
                  </p>
                  <button className='text-[#FF5A3D] font-semibold hover:underline'>Read More →</button>
                </div>
              </div>
            </SwiperSlide>

            {/* Article 3 */}
            <SwiperSlide>
              <div className='grid md:grid-cols-2 h-full'>
                <img 
                  src="/assets/anilamb news.jpg" 
                  alt="Anil Ambani House"
                  className='w-full h-full object-cover'
                />
                <div className='bg-white p-8'>
                  <h3 className='text-2xl font-bold mb-4'>Inside industrialist Anil Ambani's house in Mumbai</h3>
                  <p className='text-gray-600 mb-4'>
                    Anil Ambani's lavish home is counted among the most expensive homes in India. The 17-storey structure is situated at Pali Hill in Mumbai.
                  </p>
                  <button className='text-[#FF5A3D] font-semibold hover:underline'>Read More →</button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <Footer /> 
    </div>
  );
}
