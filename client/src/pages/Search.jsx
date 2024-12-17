import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='flex flex-col min-h-screen bg-gray-50'>
      {/* Search Header */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-800 py-8'>
        <div className='max-w-6xl mx-auto px-4'>
          <h1 className='text-3xl font-bold text-white mb-6'>Find Your Perfect Property</h1>
          <form onSubmit={handleSubmit} className='flex gap-4 flex-wrap items-center'>
            <div className='flex-1 min-w-[300px]'>
              <div className='relative'>
                <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  id='searchTerm'
                  placeholder='Search by location, property type...'
                  className='w-full pl-10 pr-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type='button'
              onClick={() => setShowFilters(!showFilters)}
              className='px-4 py-3 bg-white text-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition'
            >
              <FaFilter />
              Filters
            </button>
            <button
              type='submit'
              className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className='flex-1 max-w-6xl mx-auto w-full px-4 py-8'>
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Filters */}
          <div className={`md:w-72 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className='bg-white p-6 rounded-xl shadow-sm'>
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-4 flex items-center gap-2'>
                  <FaSort />
                  Sort By
                </h3>
                <select
                  id='sort_order'
                  className='w-full p-3 border rounded-lg'
                  onChange={handleChange}
                  defaultValue={`${sidebardata.sort}_${sidebardata.order}`}
                >
                  <option value='regularPrice_desc'>Price high to low</option>
                  <option value='regularPrice_asc'>Price low to high</option>
                  <option value='createdAt_desc'>Latest</option>
                  <option value='createdAt_asc'>Oldest</option>
                </select>
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-4'>Property Type</h3>
                <div className='flex gap-4'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      id='all'
                      className='w-5 h-5 text-blue-600'
                      onChange={handleChange}
                      checked={sidebardata.type === 'all'}
                    />
                    <span>All</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      id='rent'
                      className='w-5 h-5 text-blue-600'
                      onChange={handleChange}
                      checked={sidebardata.type === 'rent'}
                    />
                    <span>Rent</span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='checkbox'
                      id='sale'
                      className='w-5 h-5 text-blue-600'
                      onChange={handleChange}
                      checked={sidebardata.type === 'sale'}
                    />
                    <span>Sale</span>
                  </label>
                </div>
              </div>

              <div className='space-y-4'>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    id='offer'
                    className='w-5 h-5 text-blue-600'
                    onChange={handleChange}
                    checked={sidebardata.offer}
                  />
                  <span>Offer</span>
                </label>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    id='parking'
                    className='w-5 h-5 text-blue-600'
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span>Parking</span>
                </label>
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    id='furnished'
                    className='w-5 h-5 text-blue-600'
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span>Furnished</span>
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className='flex-1'>
            <div className='mb-4'>
              <h2 className='text-2xl font-semibold text-gray-900'>
                {loading ? 'Loading...' : `${listings.length} Properties Found`}
              </h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {!loading && listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>

            {showMore && (
              <button
                onClick={onShowMoreClick}
                className='w-full py-3 text-blue-600 hover:text-blue-800 text-center mt-8'
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
