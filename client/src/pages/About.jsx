import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHandshake, FaChartLine, FaUsers } from 'react-icons/fa';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="bg-[#F0F7FF] min-h-screen">
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            About <span className='text-blue-200'>BlueRoof</span>
          </h1>
          <p className='text-blue-100 text-lg max-w-3xl mx-auto'>
            Your trusted partner in finding the perfect place to call home. We're committed to making your real estate journey seamless and successful.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='max-w-6xl mx-auto py-16 px-4'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Mission</h2>
            <p className='text-gray-600 leading-relaxed mb-6'>
              At BlueRoof, we're dedicated to revolutionizing the real estate experience. Our mission is to empower individuals and families to find their perfect home through innovative technology, expert guidance, and unwavering support.
            </p>
            <p className='text-gray-600 leading-relaxed'>
              We believe that finding a home should be an exciting journey, not a stressful process. That's why we combine cutting-edge technology with personalized service to make your real estate experience seamless and enjoyable.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            {[
              { icon: FaHome, title: '5+', desc: 'Cities' },
              { icon: FaUsers, title: '1000+', desc: 'Happy Clients' },
              { icon: FaHandshake, title: '150+', desc: 'Developers' },
              { icon: FaChartLine, title: '98%', desc: 'Client Satisfaction' }
            ].map((item, index) => (
              <div key={index} className='bg-white p-6 rounded-xl shadow-lg text-center'>
                <item.icon className='text-4xl text-blue-600 mx-auto mb-4' />
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>{item.title}</h3>
                <p className='text-gray-600'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className='bg-gray-50 py-16 px-4'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-900 mb-12 text-center'>Our Values</h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='bg-white p-6 rounded-xl shadow-lg'>
              <h3 className='text-xl font-bold text-blue-600 mb-4'>Trust & Transparency</h3>
              <p className='text-gray-600'>
                We build lasting relationships through honest communication and transparent dealings. Your trust is our most valuable asset.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg'>
              <h3 className='text-xl font-bold text-blue-600 mb-4'>Innovation</h3>
              <p className='text-gray-600'>
                We leverage the latest technology and market insights to provide you with the best possible real estate experience.
              </p>
            </div>
            <div className='bg-white p-6 rounded-xl shadow-lg'>
              <h3 className='text-xl font-bold text-blue-600 mb-4'>Client-First Approach</h3>
              <p className='text-gray-600'>
                Your success is our priority. We go above and beyond to ensure your real estate goals are met with excellence.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='bg-blue-600 py-16 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-white mb-6'>Ready to Find Your Dream Home?</h2>
          <p className='text-blue-100 mb-8 max-w-2xl mx-auto'>
            Join thousands of satisfied clients who have found their perfect property with BlueRoof.
          </p>
          <Link
            to='/Explore'
            className='inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition'
          >
            Start Your Search
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
