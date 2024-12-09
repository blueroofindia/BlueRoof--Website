import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    region: '',
    city: '',
    bedrooms: '',
    price: '',
    offer: '',
    cost:''
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [priceOptions, setPriceOptions] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const formatPrice = (price) => {
      if (price >= 10000000) {
        return `${(price / 10000000).toFixed(1)} Cr`; 
      } else if (price >= 100000) {
        return `${(price / 100000).toFixed(1)} L`; 
      }
      return price; 
    };
    
    setSidebardata({
      searchTerm: urlParams.get('searchTerm') || '',
      region: urlParams.get('region') || '',
      city: urlParams.get('city') || '',
      bedrooms: urlParams.get('bedrooms') || '',
      price: urlParams.get('price') || '',
      offer: urlParams.get('offer') || '', 
      cost:urlParams.get('cost')||''
    });
  

    const fetchListings = async () => {
      try {
        setLoading(true);
        setShowMore(false);

        const query = new URLSearchParams(location.search).toString();  
        const res = await fetch(`https://ecommerce-properties-seller.onrender.com/api/listing/get?${query}`, {
          method: 'GET',
        });

        if (!res.ok) throw new Error('Failed to fetch listings');
        const data = await res.json();

        const uniqueCosts = [
          ...new Set(data.map((listing) => listing.price)),
        ].map(price => {
          return {
            rawPrice: price, // store raw price for filtering
            formattedPrice: formatPrice(price) // store formatted price for display
          };
        }).sort((a, b) => a.rawPrice - b.rawPrice);
        
        setPriceOptions(uniqueCosts);

        const filteredListings = data.filter((listing) => {
          const costRange = listing.cost.includes('-')
            ? listing.cost.split('-').map((value) => {
                const trimmed = value.trim();
                if (trimmed.endsWith('L')) {
                  return parseInt(trimmed.replace('L', ''), 10) * 100000; 
                } else if (trimmed.endsWith('Cr')) {
                  return parseInt(trimmed.replace('Cr', ''), 10) * 10000000; 
                }
                return parseInt(trimmed, 10); // Default numeric value
              })
            : listing.cost.endsWith('+')
            ? [
                parseInt(
                  listing.cost
                    .replace('L+', '')
                    .replace('Cr+', '')
                    .trim(),
                  10
                ) * (listing.cost.includes('Cr') ? 10000000 : 100000), // Handle open-ended costs
                Infinity, // Open-ended range
              ]
            : [
                parseInt(
                  listing.cost
                    .replace('L', '')
                    .replace('Cr', '')
                    .trim(),
                  10
                ) * (listing.cost.includes('Cr') ? 10000000 : 100000),
              ];
        
          const costIsValid = sidebardata.cost
            ? (costRange.length === 2
                ? parseInt(sidebardata.cost, 10) >= costRange[0] && parseInt(sidebardata.cost, 10) <= costRange[1]
                : parseInt(sidebardata.cost, 10) === costRange[0])
            : true;
        
          const searchTermIsValid = sidebardata.searchTerm
            ? listing.name.toLowerCase().includes(sidebardata.searchTerm.toLowerCase())
            : true;
        
          const regionIsValid = sidebardata.region
            ? listing.region === sidebardata.region
            : true;
        
          const cityIsValid = sidebardata.city
            ? listing.city === sidebardata.city
            : true;
        
          const bedroomsIsValid = sidebardata.bedrooms
            ? listing.bedrooms.includes(sidebardata.bedrooms)
            : true;
        
          const offerIsValid = sidebardata.offer
            ? listing.offer === (sidebardata.offer === 'true')
            : true;
        
          return (
            costIsValid &&
            searchTermIsValid &&
            regionIsValid &&
            cityIsValid &&
            bedroomsIsValid &&
            offerIsValid
          );
        });   

        setShowMore(filteredListings.length > 8);
    setListings(filteredListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [location.search]); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebardata((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    if (sidebardata.searchTerm.trim()) urlParams.set('searchTerm', sidebardata.searchTerm.trim());
    if (sidebardata.region.trim()) urlParams.set('region', sidebardata.region.trim());
    if (sidebardata.city.trim()) urlParams.set('city', sidebardata.city.trim());
    if (sidebardata.bedrooms.trim()) urlParams.set('bedrooms', sidebardata.bedrooms.trim()); // No change here
    if (sidebardata.price.trim()) urlParams.set('price', sidebardata.price.trim());
    if (sidebardata.cost.trim()) urlParams.set('cost', sidebardata.cost.trim());
    if (sidebardata.offer) urlParams.set('offer', sidebardata.offer);

    navigate(`/search?${urlParams.toString()}`);
  };

  return (
    <div className="p-7">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1 mb-4">
          <input
            type="text"
            id="searchTerm"
            placeholder="Search..."
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6a35]"
            value={sidebardata.searchTerm}
            onChange={handleChange}
            style={{
              borderColor: '#0a0a40',
              color: '#0a0a40',
            }}
          />
        </div>

        {/* Inline Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Region Filter */}
          <div className="flex-1">
            <select
              id="region"
              value={sidebardata.region}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6a35]"
              style={{
                borderColor: '#0a0a40',
                color: '#0a0a40',
              }}
            >
              <option value="">Select Region</option>
              {listings
      .map((listing) => listing.region)  // Extract region from each listing
      .filter((value, index, self) => self.indexOf(value) === index)  // Ensure uniqueness
      .map((region, index) => (
        <option key={index} value={region}>
          {region}
        </option>
      ))}
            </select>
          </div>

          {/* City Filter */}
          <div className="flex-1">
            <select
              id="city"
              value={sidebardata.city}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6a35]"
              style={{
                borderColor: '#0a0a40',
                color: '#0a0a40',
              }}
            >
              <option value="">Select Location</option>
              {listings
      .map((listing) => listing.city)  // Extract city from each listing
      .filter((value, index, self) => self.indexOf(value) === index)  // Ensure uniqueness
      .map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
              </select>
          </div>

          {/* Property Type Filter */}
          <div className="flex-1">
            <select
              id="bedrooms"
              value={sidebardata.bedrooms}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6a35]"
              style={{
                borderColor: '#0a0a40',
                color: '#0a0a40',
              }}
            >
              <option value="">Select Property Type</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="2.5 BHK">2.5 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="5 BHK">5 BHK</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>

          {/* Cost Filter */}
          <div className="flex-1">
            <select
              id="cost"
              value={sidebardata.cost}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#ff6a35]"
              style={{
                borderColor: '#0a0a40',
                color: '#0a0a40',
              }}
            >
              <option value="">Select Cost</option>
              {priceOptions.map((option, index) => (
    <option key={index} value={option.rawPrice}>
      {option.formattedPrice}
    </option>
  ))}
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-[#ff6a35] text-white p-3 rounded-lg uppercase hover:bg-[#e65c2f]"
              style={{
                color: 'white',
              }}
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Listings Section */}
      <div>
        <h1 className="text-3xl font-semibold mb-4">
          {listings.length > 0
            ? `${listings.length} Listing${listings.length > 1 ? 's' : ''} Found`
            : 'No Listings Found'}
        </h1>
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <p className="text-xl text-[#0a0a40] text-center w-full">Loading...</p>
          ) : listings.length === 0 ? (
            <p className="text-xl text-[#0a0a40]">No listings match your criteria.</p>
          ) : (
            listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)
          )}
          {showMore && (
            <button
              onClick={() => {
                const urlParams = new URLSearchParams(location.search);
                urlParams.set('startIndex', listings.length);
                fetch(`https://ecommerce-properties-seller.onrender.com/api/listing/get?${urlParams.toString()}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setListings((prev) => [...prev, ...data]);
                    setShowMore(false);
                  });
              }}
              className="text-[#ff6a35] hover:underline mt-4"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
