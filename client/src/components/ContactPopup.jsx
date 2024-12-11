import { FaWhatsapp, FaInstagram, FaPhone } from 'react-icons/fa';

export default function ContactPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919876543210', '_blank'); // Replace with your WhatsApp number
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/blueroof.india', '_blank'); // Replace with your Instagram handle
  };

  const handlePhoneClick = () => {
    window.open('tel:+919876543210'); // Replace with your contact number
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's connect!</h2>
          <p className="text-gray-600 mb-8">
            We do professional Photography and videography of your property. Use the following links and contact us to Buy/Sell property
          </p>

          {/* Contact Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="text-xl" />
              WhatsApp
            </button>

            <button
              onClick={handleInstagramClick}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <FaInstagram className="text-xl" />
              Instagram
            </button>

            <button
              onClick={handlePhoneClick}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPhone className="text-xl" />
              +91 98765 43210
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}