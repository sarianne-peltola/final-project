import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import listEndpoints from 'express-list-endpoints'

import petData from './data/pet_data.json'

dotenv.config()

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
  name: String,
  species: String,
  breeds: {
    primary: { type: String },
    secondary: { type: String },
    mixed: { type: Boolean },
    unknown: { type: Boolean }
  },
  colors: {
    primary: { type: String },
    secondary: { type: String },
    tertiary: { type: String }
  },
  age: String,
  gender: String,
  size: String,
  coat: String,
  attributes: {
    spayed_neutered: { type: Boolean },
    house_trained: { type: Boolean }
  },
  environment: {
    children: { type: String },
    dogs: { type: Boolean },
    cats: { type: String }
  },
  description: String,
  primary_photo_cropped: {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
    full: { type: String },
  },
  status: String
})

const Pet = mongoose.model('Pet', petSchema)

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
  res.json(listEndpoints(app))
})

app.get('/pets', async (req, res) => {
  const allPets = await Pet.find()

  res.json(allPets)
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});