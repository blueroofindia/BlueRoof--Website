import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';
import Contact from '../components/Contact';
import { FaLocationDot } from 'react-icons/fa6';
import { FaBuildingCircleCheck } from 'react-icons/fa6';
import Footer from './footer.jsx'

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://ecommerce-properties-seller.onrender.com/api/listing/get/${params.listingId}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <>
    <main className="bg-white text-black min-h-screen p-5 flex flex-col items-center">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="w-full flex flex-col items-center">
          {/* Common Wrapper for Padding Consistency */}
          <div className="w-full max-w-screen-lg px-5">
            {/* Swiper Section */}
            <div className="w-full">
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[550px] rounded-lg shadow-lg overflow-hidden"
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Share Button */}
            <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-[#ff6a35] cursor-pointer shadow-lg transition-transform hover:scale-105">
              <FaShareAlt
                className="text-white"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-[#ff6a35] p-2">
                Link copied!
              </p>
            )}

            {/* Details Section */}
            <div className="flex flex-col w-full mx-auto p-3 my-7 gap-4 bg-white text-black rounded-lg shadow-lg">
              <p className="text-2xl font-semibold text-[#0a0a40]">
                {listing.name} - {''}
                {listing.offer?(
                  <span className="text-red-500">Rs.{listing.cost}</span>
                )
                  : listing.regularPrice.toLocaleString('en-US')}
              </p>
              <p className="flex items-center mt-6 gap-2 text-[#0a0a40] text-sm">
                <FaMapMarkerAlt className="text-[#0a0a40]" />
                {listing.address}
              </p>

              
              <div className="flex mt-4">
                <a
                  href={listing.instaLink}
                  className="text-3xl text-pink-600 hover:opacity-80 transition-transform hover:scale-110 mx-1"
                >
                  <FaInstagram />
                </a>
                
                <a
                  href={listing.ytLink}
                  className="text-3xl text-red-600 hover:opacity-80 transition-transform hover:scale-110 mx-1"
                >
                  <FaYoutube />
                </a>
              </div>

              <p className="text-black mt-6">
                <span className="font-semibold text-[#0a0a40]">Description - </span>
                {listing.description}
              </p>

              {/* Creative Icons Section */}
              <div className="relative flex flex-col items-center mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full p-4">
                  {/* Developer */}
                  <div className="relative p-6 bg-[#f3f4f6] rounded-lg shadow-lg flex items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
                    <FaBuildingCircleCheck className="text-5xl text-[#0a0a40] absolute -top-6 left-6 bg-[#ff6a35] p-3 rounded-full" />
                    <p className="ml-14 text-center font-semibold">
                      {listing.developer}
                    </p>
                  </div>
                  {/* Location */}
                  <div className="relative p-6 bg-[#f3f4f6] rounded-lg shadow-lg flex items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
                    <FaLocationDot className="text-5xl text-[#0a0a40] absolute -top-6 left-6 bg-[#ff6a35] p-3 rounded-full" />
                    <p className="ml-14 text-center font-semibold">
                      {listing.region}
                    </p>
                  </div>
                  {/* Parking */}
                  <div className="relative p-6 bg-[#f3f4f6] rounded-lg shadow-lg flex items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
                    <FaParking className="text-5xl text-[#0a0a40] absolute -top-6 left-6 bg-[#ff6a35] p-3 rounded-full" />
                    <p className="ml-14 text-center font-semibold">
                      {listing.parking ? 'Parking spot' : 'Parking'}
                    </p>
                  </div>
                </div>
              </div>
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
      
    </main>
    <div className='bg-blue-100'></div>
    <Footer />
    </>
  );
}
