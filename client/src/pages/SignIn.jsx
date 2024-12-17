import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { FaEnvelope, FaLock, FaHome } from 'react-icons/fa';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <Link to='/' className='flex items-center justify-center gap-2 text-3xl font-bold text-blue-600 mb-2'>
            <FaHome className='text-4xl' />
            <span>BlueRoof</span>
          </Link>
          <h2 className='text-3xl font-bold text-gray-900'>Welcome back</h2>
          <p className='mt-2 text-gray-600'>Sign in to your account</p>
        </div>

        <div className='bg-white p-8 rounded-xl shadow-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email address
              </label>
              <div className='mt-1 relative'>
                <FaEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='email'
                  id='email'
                  className='pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter your email'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <div className='mt-1 relative'>
                <FaLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='password'
                  id='password'
                  className='pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Enter your password'
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed'
              >
                {loading ? 'Loading...' : 'Sign In'}
              </button>
            </div>

            <OAuth />
          </form>

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6' role='alert'>
              <span className='block sm:inline'>{error}</span>
            </div>
          )}

          <div className='mt-6 text-center text-sm'>
            <p className='text-gray-600'>
              Don't have an account?{' '}
              <Link to='/sign-up' className='font-medium text-blue-600 hover:text-blue-500'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
