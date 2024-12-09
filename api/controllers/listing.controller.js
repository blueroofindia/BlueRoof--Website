import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  // if (req.user.id !== listing.userRef) {
  //   return next(errorHandler(401, 'You can only delete your own listings!'));
  // }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const filter = {};

    // Search term filter (only for the 'name' field)
    const searchTerm = req.query.searchTerm || '';
    if (searchTerm) {
      filter.name = { $regex: searchTerm, $options: 'i' }; // Match term anywhere in the 'name' field
    }

    // Bedrooms filter (only one type of bedroom can be selected)
    if (req.query.bedrooms) {
      const bedroomType = req.query.bedrooms.trim();
      console.log(bedroomType)
      // Update the filter to check if the selected bedroom type is in the bedrooms array
      filter.bedrooms = { $in: [bedroomType] }; // Direct match to the array, if the bedroomType is found, it will match the listing
    }

    // Offer filter
    if (req.query.offer !== undefined) {
      filter.offer = req.query.offer === 'true';
    }

    // Cost filter (if applicable)
    if (req.query.price) {
      filter.price = parseInt(req.query.price);
    }    

    // Region and city filters
    if (req.query.region) {
      filter.region = req.query.region;
    }
    if (req.query.city) {
      filter.city = req.query.city;
    }

    // Sorting options
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    // Query the database
    const listings = await Listing.find(filter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
