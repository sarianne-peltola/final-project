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
  breeds: String,
  colors: String,
  age: String,
  gender: String,
  size: String,
  coat: String,
  attributes: String,
  environment: String,
  description: String,
  primary_photo_cropped: String,
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

// Get all the pets
app.get('/pets', async (req, res) => {
  const allPets = await Pet.find()

  res.json(allPets)
})

// Get one pet by id (path parameter)
app.get('/pets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const singlePet = await Pet.findById(id)
    if (singlePet) {
      res.json(singlePet)
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  }
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});