import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import listEndpoints from 'express-list-endpoints';

import petData from './data/pet_data.json';

dotenv.config();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/petAPI';
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

const petSchema = new mongoose.Schema({
  petId: Number,
  name: String,
  species: String,
  breed: String,
  colors: String,
  age: String,
  gender: String,
  size: String,
  coat: String,
  environment: {
    children: String,
    dogs: String,
    cats: String,
  },
  photo: String,
});

const Pet = mongoose.model('Pet', petSchema);

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    maxlenght: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex'),
  },
});

const PetMessage = mongoose.model('PetMessage', {
  message: {
    type: String,
    required: true,
    maxlenght: 250,
    minlenght: 5,
  }
})

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization');

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error });
  }
};

if (process.env.RESET_DB) {
  const seedDB = async () => {
    await Pet.deleteMany();

    petData.forEach((item) => {
      new Pet(item).save();
    });
  };
  seedDB();
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json(listEndpoints(app));
});

// Get all the pets
app.get('/pets', async (req, res) => {
  const { gender, size, age } = req.query;
  const page = Number(req.query.page) || 1;
  const per_page = Number(req.query.per_page) || 10;

  const allPets = await Pet.aggregate([
    {
      $match: {
        gender: {
          $regex: new RegExp(gender || ''),
        },
        size: {
          $regex: new RegExp(size || ''),
        },
        age: {
          $regex: new RegExp(age || ''),
        },
      },
    },
    {
      $skip: Number((page - 1) * per_page),
    },
    {
      $limit: Number(per_page),
    },
  ]);
  res.json({ success: true, allPets });
});

// Get one pet by id (path parameter)
app.get('/pets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const singlePet = await Pet.findById(id);
    if (singlePet) {
      res.json({ success: true, singlePet });
    } else {
      res.status(404).json({ success: false, message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    const newUser = await new User({
      name,
      email,
      password: bcrypt.hashSync(password, salt),
    }).save();

    res.json({
      success: true,
      userID: newUser._id,
      name: newUser.name,
      email: newUser.email,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Invalid request, cannot create user',
        error,
      });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        userID: user._id,
        email: user.email,
        accessToken: user.accessToken,
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid reqeust', error });
  }
});

app.get('/mypage', authenticateUser);
app.get('/mypage', async (req, res) => {
  const userDetails = await User.findOne({
    accessToken: req.header('Authorization'),
  });
  res.json(userDetails);
});

app.get('/interest', authenticateUser)
app.post('/interest', async (req, res) => {
  const { message } = req.body

  try {
    const newMessage = await new PetMessage({ message }).save()
    res.json({ success: true, newMessage});
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error });
  }
});


app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
