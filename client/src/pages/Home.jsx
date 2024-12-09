import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import img1 from '../assets/image1.jpg';
import img2 from '../assets/image1.jpg';
import img3 from '../assets/image1.jpg';
import hero from '../assets/House searching-bro(1).png';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Card from './Card.jsx'; // Make sure to update the path
import Footer from './footer.jsx'
import { FaSearch } from 'react-icons/fa';
import one from '../assets/img1.png'
import two from '../assets/img2.jpg'
import three from '../assets/img3.jpg'
import four from '../assets/img4.jpg'
import five from '../assets/img5.jpg'
import six from '../assets/img6.jpg'
import seven from '../assets/img7.jpg'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [underConstructionListings, setUnderConstructionListings] = useState([]);
  const [nearingPossessionListings, setNearingPossessionListings] = useState([]);
  const [readyToMoveListings, setReadyToMoveListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('https://ecommerce-properties-seller.onrender.com/api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUnderConstructionListings = async () => {
      try {
        const res = await fetch('https://ecommerce-properties-seller.onrender.com/api/listing/get?type=under%20construction&limit=3');
        const data = await res.json();
        setUnderConstructionListings(data);
        fetchNearingPossessionListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNearingPossessionListings = async () => {
      try {
        const res = await fetch('https://ecommerce-properties-seller.onrender.com/api/listing/get?type=nearing%20possession&limit=3');
        const data = await res.json();
        setNearingPossessionListings(data);
        fetchReadyToMoveListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchReadyToMoveListings = async () => {
      try {
        const res = await fetch('https://ecommerce-properties-seller.onrender.com/api/listing/get?type=ready%20to%20move&limit=3');
        const data = await res.json();
        setReadyToMoveListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    // Initial call
    fetchOfferListings();
    fetchUnderConstructionListings();

  }, []);

  useEffect(() => {
    const allListings = [...offerListings, ...saleListings, ...rentListings];
    setUnderConstructionListings(allListings.filter(listing => listing.type === 'under construction'));
    setNearingPossessionListings(allListings.filter(listing => listing.type === 'nearing possession'));
    setReadyToMoveListings(allListings.filter(listing => listing.type === 'ready to move'));
  }, [offerListings, saleListings, rentListings]);

  const carouselRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        top: 0,
        left: direction * carouselRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const slides = [
    {
      img: one,
      heading: "Maharashtra issues special fire safety regulations",
      description: "Maharashtra government on October 11, 2024 has issued final notifications to enforce fire safety norms for vulnerable buildings in Mumbai and Maharashtra.",
    },
    {
      img: two,
      heading: "Everything you want to know about Mukesh Ambani’s Antilia house",
      description: "The Ambani house is the world’s most expensive biggest residential property.",
    },
    {
      img: three,
      heading: "Inside industrialist Anil Ambani’s house in Mumbai",
      description: "Anil Ambani’s lavish home is counted among the most expensive homes in India. The 17-storey structure is situated at Pali Hill in Mumbai.",
    },
    {
      img: four,
      heading: "Inside Rohit Sharma’s lavish Mumbai house",
      description: "Rohit Sharma house is on the 29th floor of Ahuja Towers, the imposing 53-storied building in Worli that has a gorgeous view of the Arabian Sea.",
    },
    {
      img: five,
      heading: "Residential sector records sale of 87,108 units in Q3 2024: Report",
      description: "Among the top 8 Indian cities, Mumbai led with sales of 24,222 units in Q3 2024, making this the best recorded quarterly sales volume since 2018.",
    },
    {
      img: six,
      heading: "A look at industrialist late Ratan Tata’s House, Halekai in Mumbai",
      description: "Know all about late Ratan Tata house in Mumbai that is worth Rs 150 crores and covers a mammoth 13,350 sq ft across three storeys.",
    },
    {
      img: seven,
      heading: "Bhunaksha Maharashtra: How to check DLRS Maharashtra map online?",
      description: "Also known as Cadastral Maps, these DLRS Maharashtra map documents are important information that all new buyers should check, before signing any property deal.",
    },
  ];

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${(price / 100000).toFixed(2)} Lakh`;
    } else {
      return price.toLocaleString(); // Adds commas for readability (e.g., 90,000)
    }
  };

  return (
    <>
      <div>
        {/* top */}
        <div
          className="flex flex-col lg:flex-row items-center gap-8 p-1 bg-cover bg-center max-w-6xl mx-auto px-4 my-10"
          style={{
            backgroundImage: 'url(https://storyset.com/images/stars.svg)',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {/* Left Section - Text and Form */}
          <div className="flex flex-col gap-4 max-w-lg lg:max-w-md text-center lg:text-left lg:mr-8">
            <h1 className="text-6xl font-bold text-slate-800">
              Crafted for those who seek the best
            </h1>
            <p className="text-lg text-slate-600">
              Explore properties, projects, and locations to suit your lifestyle.
            </p>
            <div className="flex justify-center lg:justify-start">
              <form
                onSubmit={handleSubmit}
                className="flex items-center p-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded-2xl shadow-md"
                style={{ maxWidth: '600px' }}
              >
                <input
                  type="text"
                  placeholder="Find your ideal property, project, or location..."
                  className="bg-transparent focus:outline-none w-48 sm:w-96 px-2 text-slate-800 placeholder-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="ml-2">
                  <FaSearch className="text-slate-600 hover:text-slate-800 transition duration-200" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Section - Hero Image */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <img
              src={hero} // Replace with your hero image URL
              alt="Hero"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* swiper */}
        {/* <Swiper navigation>
      {offerListings &&
        offerListings.length > 0 &&
        offerListings.map((listing) => (
          <SwiperSlide>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
              key={listing._id}
            ></div>
          </SwiperSlide>
        ))}
    </Swiper> */}
        <Swiper navigation>
          <SwiperSlide>
            <div
              style={{
                background: `url("https://i.imgur.com/pgEiV0I.jpg") center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                background: `url(${image2}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              style={{
                background: `url(${image3}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='h-[500px]'
            ></div>
          </SwiperSlide>
        </Swiper>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10' style={{ marginBottom: 0 }}>
          <div className='my-3'>
            <h2 className='text-5xl font-semibold text-slate-600'>Signature property</h2><br />
            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=ready to move'}>Show more places ready to move</Link>
          </div>
        </div>
        <div className="flex justify-center items-center bg-blue-100 p-3">
          <Card
            image="https://firebasestorage.googleapis.com/v0/b/estate-ecommerce-app.appspot.com/o/1703695268787C.I-View-05.webp?alt=media&token=42604ca7-b1ad-4d5a-a65a-d1ebe1abb753"
            title="Kalpataru Vivant"
            description="Andheri East, Western Suburbs, Mumbai"
            price="2.45 Cr - 3.78 Cr"
            details="2, 3 BHK Apartments"
          />

        </div>
        {/* listing results for offer, sale and rent */}


        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8 my-10">
          {/* Recent Offers */}
          {offerListings && offerListings.length > 0 && (
            <div className="my-3">
              <h2 className="text-5xl font-semibold text-slate-600">Featured Properties</h2><br />
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={'http://localhost:5173/search?offer=true'}
              >
                Show more offers
              </Link><br />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                <div
                  className="bg-white border border-gray-200 rounded-lg shadow-md max-w-3xs"
                  key={'674af4e232db38e38d33e035'}
                >
                  <Link to={`/listing/${"674af4e232db38e38d33e035"}`}>
                    <img
                      src="https://imgur.com/CJ4efUk.jpg"
                      className="rounded-t-lg w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-5 bg-gradient-to-b from-[#0a0a40] to-[#0a0a40] text-white rounded-b-lg">
                    <h3 className="text-xl font-semibold">25 South</h3>
                    <div className="flex items-center text-sm my-1">
                      <FaMapMarkerAlt className="text-white mr-1" />
                      <span className="text-gray-200">Prabhadevi, Mumbai</span>
                    </div>
                    <p className="text-gray-300 text-sm">25 South by The Wadhwa Group and Hubtown is a RERA-registered under-construction project in Prabhadevi, Mumbai, offering 3BHK and 4BHK apartments with possession by June 2028.</p>
                    <div className="mt-4">
                      <p className="text-3xl font-bold">Rs.10Cr</p>
                      <p className="flex items-center text-sm">
                        <FaMapMarkerAlt className="mr-1" />
                        <span className="text-[#ff6a35]">Mumbai</span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div
                    className="bg-white border border-gray-200 rounded-lg shadow-md max-w-3xs"
                    key={listing._id}
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src={listing.imageUrls[0]}
                        alt={listing.name}
                        className="rounded-t-lg w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-5 bg-gradient-to-b from-[#0a0a40] to-[#0a0a40] text-white rounded-b-lg">
                      <h3 className="text-xl font-semibold">{listing.name}</h3>
                      <div className="flex items-center text-sm my-1">
                        <FaMapMarkerAlt className="text-white mr-1" />
                        <span className="text-gray-200">{listing.address}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{listing.description}</p>
                      <div className="mt-4">
                      <p className="text-3xl font-bold">{formatPrice(listing.price)}</p>
                      <p className="flex items-center text-sm">
                          <FaMapMarkerAlt className="mr-1" />
                          <span className="text-[#ff6a35]">{listing.city}</span>
                        </p>
                      </div>
                    </div>
                  </div> */}
                <div
                  className="bg-white border border-gray-200 rounded-lg shadow-md max-w-3xs"
                  key={'6749b1c62510d7520ed4edd7'}>
                  <Link to={`/listing/${'6749b1c62510d7520ed4edd7'}`}>
                    <img
                      src='https://imgur.com/RXBbRyU.jpg'
                      className="rounded-t-lg w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-5 bg-gradient-to-b from-[#0a0a40] to-[#0a0a40] text-white rounded-b-lg">
                    <h3 className="text-xl font-semibold">Aaradhya Avaan</h3>
                    <div className="flex items-center text-sm my-1">
                      <FaMapMarkerAlt className="text-white mr-1" />
                      <span className="text-gray-200">Aaradhya Avaan</span>
                    </div>
                    <p className="text-gray-300 text-sm">MICL Aaradhya Avaan by MICL is a  luxury under-construction project in Tardeo, Mumbai, featuring 3 towers with 61 floors and exclusive designer residences, set for possession in December 2030.</p>
                    <div className="mt-4">
                      <p className="text-3xl font-bold">Rs.9Cr</p>
                      <p className="flex items-center text-sm">
                        <FaMapMarkerAlt className="mr-1" />
                        <span className="text-[#ff6a35]">Mumbai</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-white border border-gray-200 rounded-lg shadow-md max-w-3xs"
                  key={'674af4e232db38e38d33e035'}
                >
                  <Link to={`/listing/${"674af4e232db38e38d33e035"}`}>
                    <img
                      src="https://imgur.com/CJ4efUk.jpg"
                      className="rounded-t-lg w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-5 bg-gradient-to-b from-[#0a0a40] to-[#0a0a40] text-white rounded-b-lg">
                    <h3 className="text-xl font-semibold">25 South</h3>
                    <div className="flex items-center text-sm my-1">
                      <FaMapMarkerAlt className="text-white mr-1" />
                      <span className="text-gray-200">Prabhadevi, Mumbai</span>
                    </div>
                    <p className="text-gray-300 text-sm">25 South by The Wadhwa Group and Hubtown is a RERA-registered under-construction project in Prabhadevi, Mumbai, offering 3BHK and 4BHK apartments with possession by June 2028.</p>
                    <div className="mt-4">
                      <p className="text-3xl font-bold">Rs.10Cr</p>
                      <p className="flex items-center text-sm">
                        <FaMapMarkerAlt className="mr-1" />
                        <span className="text-[#ff6a35]">Mumbai</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Under Construction */}
          {offerListings && offerListings.length > 0 && (
            <div className="my-3">
              <h2 className="text-5xl font-semibold text-slate-600">Featured Developers</h2><br />
              <br /><br />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                <div
                  className="relative bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {/* Circular Image */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#ff6a35] shadow-md">
                    
                    <img
      src="https://imgur.com/W7BJORU.jpg" // Actual Runwal image URL
      alt="Lodha"
      className="w-full h-full object-fill" // Updated to "object-fill" to ensure the image fills the circle
    />
                  </div>
                  {/* Card Content */}
                  <div className="p-5 mt-12">
                    <h3 className="text-xl font-semibold text-[#ff6a35] text-center">
                      Lodha
                    </h3>
                    <div className="flex items-center justify-center text-sm mt-2">
                      <FaMapMarkerAlt className="text-[#ff6a35] mr-1" />
                      <span className="text-gray-500">Kolshet Road </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2 text-center"> Premium homes with world-class amenities and breathtaking views.</p>
                    <div className="mt-4 flex justify-between items-center">
                      {/* <p className="text-3xl font-bold text-[#ff6a35]">${listing.cost}</p> */}
                      <p className="flex items-center text-sm text-[#ff6a35]">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>Thane</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div
  className="relative bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
  {/* Circular Image */}
  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#ff6a35] shadow-md">
    <img
      src="https://imgur.com/8pfGsPW.jpg" // Replace with actual Piramal image URL
      alt="Piramal"
      className="w-full h-full object-fill"
    />
  </div>
  {/* Card Content */}
  <div className="p-5 mt-12">
    <h3 className="text-xl font-semibold text-[#ff6a35] text-center">
      Piramal
    </h3>
    <div className="flex items-center justify-center text-sm mt-2">
      <FaMapMarkerAlt className="text-[#ff6a35] mr-1" />
      <span className="text-gray-500">Lower Parel</span>
    </div>
    <p className="text-gray-600 text-sm mt-2 text-center">Luxury residences that redefine modern living in Mumbai.</p>
    <div className="mt-4 flex justify-between items-center">
      <p className="flex items-center text-sm text-[#ff6a35]">
        <FaMapMarkerAlt className="mr-1" />
        <span>Mumbai</span>
      </p>
    </div>
  </div>
</div>
<div
  className="relative bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
  {/* Circular Image */}
  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#ff6a35] shadow-md">
    <img
      src="https://imgur.com/DAFwUtm.jpg" // Replace with actual Runwal image URL
      alt="Runwal"
      className="w-full h-full object-fill"
    />
  </div>
  {/* Card Content */}
  <div className="p-5 mt-12">
    <h3 className="text-xl font-semibold text-[#ff6a35] text-center">
      Runwal
    </h3>
    <div className="flex items-center justify-center text-sm mt-2">
      <FaMapMarkerAlt className="text-[#ff6a35] mr-1" />
      <span className="text-gray-500">Mulund West</span>
    </div>
    <p className="text-gray-600 text-sm mt-2 text-center">Affordable yet stylish homes in a vibrant community.</p>
    <div className="mt-4 flex justify-between items-center">
      <p className="flex items-center text-sm text-[#ff6a35]">
        <FaMapMarkerAlt className="mr-1" />
        <span>Mumbai</span>
      </p>
    </div>
  </div>
</div>


              </div>
            </div>
          )}
          <h2 className='text-slate-600 text-5xl font-semibold'>
            Latest News and Articles
          </h2>
          <div id="news-section" className="w-full bg-gray-100 py-8 rounded-lg">
            <div className="container mx-auto relative">
              {/* Carousel Wrapper */}
              <div
                ref={carouselRef}
                className="carousel flex overflow-x-auto snap-x snap-mandatory px-4  "
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="snap-center shrink-0 w-full md:w-1/3 px-4"
                  >
                    <img
                      src={slide.img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <h3 className="mt-4 text-xl font-bold text-gray-800">
                      {slide.heading}
                    </h3>
                    <p className="mt-2 text-gray-600">{slide.description}</p>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation Buttons */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <button
                  className="p-2 bg-gray-300 rounded-full"
                  onClick={() => scrollCarousel(-1)}
                >
                  <FaArrowLeft />
                </button>
              </div>
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                <button
                  className="p-2 bg-gray-300 rounded-full"
                  onClick={() => scrollCarousel(1)}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListings && offerListings.length > 0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-5xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'http://localhost:5173/search?offer=true'}>Show more offers</Link>
              </div>
              <div className='flex flex-wrap gap-14'>
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {underConstructionListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-5xl font-semibold text-slate-600'>Recent places under construction</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=under construction'}>Show more places under construction</Link>
              </div>
              <div className='flex flex-wrap gap-14'>
                {underConstructionListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {nearingPossessionListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-5xl font-semibold text-slate-600'>Recent places nearing possession</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=nearing possession'}>Show more places nearing possession</Link>
              </div>
              <div className='flex flex-wrap gap-14'>
                {nearingPossessionListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {readyToMoveListings.length > 0 && (
            <div>
              <div className='my-3'>
                <h2 className='text-5xl font-semibold text-slate-600'>Recent places ready to move</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=ready to move'}>Show more places ready to move</Link>
              </div>
              <div className='flex flex-wrap gap-14'>
                {readyToMoveListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div> */}
      </div>
      <div className='bg-blue-100'></div>
      <Footer />
    </>
  );
}
