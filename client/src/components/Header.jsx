import { FaWhatsapp, FaEnvelope, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import img1 from '../assets/logo-removebg-preview (1).png';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleAboutPopup = () => {
    setIsAboutPopupOpen(!isAboutPopupOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='shadow-md bg-gray-900'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <img src={img1} alt='Company Logo' className='h-10' />
        </Link>
        <button
          onClick={toggleMenu}
          className='sm:hidden text-white focus:outline-none'
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <ul
          className={`sm:flex hidden sm:flex-row sm:gap-4 sm:items-center`}
        >
          <Link to=''>
            <li className='text-white hover:underline'>Trending</li>
          </Link>
          <li
            className='text-white hover:underline cursor-pointer'
            onClick={toggleAboutPopup}
          >
            About Us
          </li>
          <li
            className='text-white hover:underline cursor-pointer'
            onClick={togglePopup}
          >
            Post Property (Free)
          </li>
          <a href='../#news-section'>
            <li className='text-white hover:underline'>News</li>
          </a>
          <Link to='/search?offer=true'>
            <li className='text-white hover:underline'>Explore</li>
          </Link>
        </ul>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className='sm:hidden bg-gray-800 p-4 shadow-lg'>
          <ul className='flex flex-col gap-3'>
            <Link to=''>
              <li className='text-white hover:underline'>Trending</li>
            </Link>
            <li
              className='text-white hover:underline cursor-pointer'
              onClick={toggleAboutPopup}
            >
              About Us
            </li>
            <li
              className='text-white hover:underline cursor-pointer'
              onClick={togglePopup}
            >
              Post Property (Free)
            </li>
            <a href='../#news-section'>
              <li className='text-white hover:underline'>News</li>
            </a>
            <Link to='/search?offer=true'>
              <li className='text-white hover:underline'>Explore</li>
            </Link>
          </ul>
        </div>
      )}

      {/* Post Property Popup */}
      {isPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            className='bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm sm:max-w-md lg:max-w-lg'
            style={{ backgroundColor: '#0a0a40', position: 'relative' }}
          >
            <button
              onClick={togglePopup}
              className='absolute top-3 right-3 text-white'
              style={{ background: 'none', border: 'none' }}
            >
              <FaTimes size={20} />
            </button>
            <h2 className='text-xl font-semibold text-white mb-4'>Get in Touch!</h2>
            <div className='space-y-4'>
              <button className='flex items-center justify-center w-full p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white'>
                <FaWhatsapp className='mr-2' />
                WhatsApp
              </button>
              <button className='flex items-center justify-center w-full p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white'>
                <FaEnvelope className='mr-2' />
                Gmail
              </button>
              <button className='flex items-center justify-center w-full p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white'>
                <FaInstagram className='mr-2' />
                Instagram
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Us Popup */}
      {isAboutPopupOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div
            className='bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm sm:max-w-md lg:max-w-lg'
            style={{ backgroundColor: '#0a0a40', position: 'relative' }}
          >
            <button
              onClick={toggleAboutPopup}
              className='absolute top-3 right-3 text-white'
              style={{ background: 'none', border: 'none' }}
            >
              <FaTimes size={20} />
            </button>
            <h2 className='text-xl font-semibold text-white mb-4'>About Us</h2>
            <img src={img1} alt='Company Logo' className='h-10' />
            <br />
            <p className='text-white text-sm mb-4'>
              Welcome to our platform! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo elit non dui volutpat, sed volutpat risus elementum. In hac habitasse platea dictumst.
            </p>
            <p className='text-white text-sm'>
              Proin vehicula felis vel nulla egestas, vel vulputate nisi sodales. Nunc auctor mi et turpis pellentesque, eget scelerisque justo aliquet. Integer vehicula turpis nec semper pharetra.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
