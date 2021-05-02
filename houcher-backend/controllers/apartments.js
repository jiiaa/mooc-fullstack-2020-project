const apartmentsRouter = require('express').Router();
const Apartment = require('../models/apartment');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const storage = multer.memoryStorage();
const uploadMultiple = multer({ storage: storage }).array('fileToUpload[]', 10);

// Handle token in the request header
const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// Upload an image to S3 bucket and return a promise
const uploadFileS3 = (fileObject, s3bucket) => {
  // Add a hash to filename
  const fileHash = new Date().getTime();
  const fileName = `${fileHash}-${fileObject.originalname}`;

  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType:fileObject.mimetype,
    Body: fileObject.buffer,
    ACL: 'public-read'
  };
  return s3bucket.upload(params).promise();
};


// Get all the apartments and populate the owner of the apartment
apartmentsRouter.get('/', async (req, res) => {
  const apartments = await Apartment.find({}).populate('user');

  res.json(apartments.map(apartment => apartment.toJSON()));
});

// Get an apartment by the ID and populate the owner of the apartment
apartmentsRouter.get('/:id', async (req, res) => {
  const apartment = await Apartment.findById(req.params.id).populate('user');

  res.json(apartment);
});

// Add a new apartment to the database
apartmentsRouter.post('/', uploadMultiple, async (req, res) => {
  const files = req.files;
  const fields = req.body;
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  });
  // Initialize array for the promises of the S3 image uploading
  let promisesAws = [];
  // Upload files one by one to the S3 bucket
  files.map((file) => {
    promisesAws.push(uploadFileS3(file, s3bucket));
  });
  // Resolve the promises returned by the image uploading
  Promise.all(promisesAws).then(data => {
    // Loop the promises and return the URLs of the images
    const images = data.map((item) => {
      return item.Location;
    });
    return images;
  })
    .then((images) => {
      const apartment = new Apartment({
        streetAddress: fields.streetAddress,
        zipCode: fields.zipCode,
        city: fields.city,
        apartmentType: fields.apartmentType,
        surfaceArea: fields.surfaceArea,
        numberOfRooms: fields.numberOfRooms,
        buildYear: fields.buildYear,
        hasSauna: fields.hasSauna,
        hasBalcony: fields.hasSauna,
        hasOwnPlot: fields.hasOwnPlot,
        hasElevator: fields.hasElevator,
        numberOfFloors: fields.numberOfFloors,
        floor: fields.floor,
        apartmentSetting: fields.apartmentSetting,
        header: fields.header,
        description: fields.description,
        images: images,
        price: fields.price,
        user: user._id
      });
      return apartment;
    })
    .then((apartment) => {
      // Save the apartment to the database
      const savedApartment = apartment.save();
      return savedApartment;
    })
    .then((savedApartment) => {
      res.json(savedApartment.toJSON());
    })
    .catch((error) => {
      console.log('error', error);
      res.status(500).json({ message: 'Asunnon tallennus epäonnistui. Yritä myöhemmin uudelleen.' });
    });
});

// Edit the data of the apartment by ID
apartmentsRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const apartment = req.body;
  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'Token puuttuu tai on väärä' });
  }
  const updatedApartment = await Apartment.findByIdAndUpdate(id, apartment, { new: true } );
  res.status(200).json(updatedApartment);
});

// blogsRouter.delete('/:id', async (req, res) => {
//   const token = getTokenFrom(req);

//   const decodedToken = jwt.verify(token, process.env.SECRET);
//   if (!token || !decodedToken.id) {
//     return res.status(401).json({ error: 'token missing or invalid' });
//   }
//   const user = await User.findById(decodedToken.id);
//   const blog = await Blog.findById(req.params.id);

//   if (blog.user.toString() === user._id.toString()) {
//     await Blog.findByIdAndRemove(req.params.id);
//     res.status(204).end();
//   } else {
//     return res.status(401).json({ error: 'error' });
//   }
// });

// blogsRouter.put('/:id', async (req, res) => {
//   const body = req.body;

//   const blog = {
//     user: body.user,
//     title: !body.title ? undefined : body.title,
//     author: body.author,
//     url: !body.url ? undefined : body.url,
//     likes: !body.likes ? 0 : body.likes
//   };

//   const updatedBlog = await Blog.findByIdAndUpdate(
//     req.params.id, blog, { new: true }
//   );
//   res.json(updatedBlog);

// });

module.exports = apartmentsRouter;
