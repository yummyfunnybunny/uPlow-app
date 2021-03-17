// ANCHOR -- Require Modules --
const Location = require("../Models/locationModel");
const catchAsync = require("../Utilities/catchAsync");
const AppError = require("../Utilities/appError");

// SECTION == Middleware ==
// !SECTION

// SECTION == Functions ==

// ANCHOR -- Get All Locations --
module.exports.getAllLocations = catchAsync(async (req, res, next) => {
  // 1) Get all locations in DB
  const locations = await Location.find();
  // 2) show error message if no location was found
  if (!locations) console.log("No locations were found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully retrieved all locations",
    results: locations.length,
    data: locations,
  });
});

// ANCHOR -- Create Location --
module.exports.createLocation = catchAsync(async (req, res, next) => {
  // 1) Create new location in DB
  const location = await Location.create(req.body);
  // 2) show error message if no location was found
  if (!location) console.log("no location was created.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully created location",
    data: location,
  });
});

// ANCHOR -- Get Location --
module.exports.getLocation = catchAsync(async (req, res, next) => {
  // 1) Find location in DB
  const location = await Location.findById(req.params.id);
  // 2) show error message if no location was found
  if (!location) console.log("No location was found for that ID");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully created location",
    data: location,
  });
});

// ANCHOR -- Update Location --
module.exports.updateLocation = catchAsync(async (req, res, next) => {
  // 1) Find location in DB and update
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // 2) show error message if no location was found
  if (!location) console.log("No location by that ID was found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully updated location",
    data: location,
  });
});

// ANCHOR -- Delete Location --
module.exports.deleteLocation = catchAsync(async (req, res, next) => {
  // 1) Find location in DB and delete
  const location = await Location.findByIdAndRemove(req.params.id);
  // 2) show error message if no location was found
  if (!location) console.alert("no location with that ID was found.");
  // 3) send successful response
  res.status(200).json({
    status: "Successfully deleted location",
    data: location,
  });
});

// ANCHOR -- Get locations Within --
// url example: // /locations/locations-within/400/center/34.111745,-118.113491/unit/mi
// exports.getLocationsWithin = catchAsync(async (req, res, next) => {
//   // destructure the url parameters into their own constants
//   const { distance, latlng, unit } = req.params;

//   // destructure the latlng constant into an array of separated units
//   const [lat, lng] = latlng.split(",");

//   // define the radius by converting the distance provided into the mongoDB accepted unit 'radian'
//   // Earth Radius in miles: 3963.2
//   // Earth radius in kilometers: 6378.1
//   const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

//   // If lat/lng was not provided in correct format, throw an error
//   if (!lat || !lng) {
//     next(
//       new AppError(
//         "Please provide  latitude and longitude in the format lat,lng.",
//         400
//       )
//     );
//   }

//   // check the variables if you want to...
//   console.log(distance, lat, lng, unit);

//   // filter the locations based on the startLocation being within the desired distance
//   // '$geoWithin' is an operator like '$lt/$gte', but for geospatial data
//   const locations = await Location.find({
//     location: {
//       $geoWithin: {
//         // notice that longitude comes first in geoJSON, NOT latitude
//         $centerSphere: [[lng, lat], radius],
//       },
//     },
//   });

//   // const locations = await Location.find();
//   console.log(locations);

//   // Send success response
//   res.status(200).json({
//     status: "success",
//     results: locations.length,
//     data: {
//       data: locations,
//     },
//   });
// });

exports.getLocationsWithin = async (dis, coords, unit) => {
  // Coord is in this format: 'latitude, longitude'

  // destructure the latlng constant into an array of separated units
  const [lat, lng] = coords.split(",");

  // define the radius by converting the distance provided into the mongoDB accepted unit 'radian'
  // Earth Radius in miles: 3963.2
  // Earth radius in kilometers: 6378.1
  const radius = unit === "mi" ? dis / 3963.2 : dis / 6378.1;

  // If lat/lng was not provided in correct format, throw an error
  if (!lat || !lng) {
    next(
      new AppError(
        "Please provide  latitude and longitude in the format lat,lng.",
        400
      )
    );
  }

  // check the variables if you want to...
  // console.log(dis, lat, lng, unit);

  // filter the locations based on the startLocation being within the desired distance
  // '$geoWithin' is an operator like '$lt/$gte', but for geospatial data
  const locations = await Location.find({
    location: {
      $geoWithin: {
        // notice that longitude comes first in geoJSON, NOT latitude
        $centerSphere: [[lng, lat], radius],
      },
    },
  });

  // const locations = await Location.find();
  console.log(locations);

  // return the results
  return locations;

  // Send success response
  // res.status(200).json({
  //   status: "success",
  //   results: locations.length,
  //   data: {
  //     data: locations,
  //   },
  // });
};
// !SECTION
