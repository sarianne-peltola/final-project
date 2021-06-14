import { createSlice } from '@reduxjs/toolkit'

const pets = createSlice({
  name: 'pets',
  initialState: {
    petData: [],
    likedPets: [],
    errors: []
  },
  reducers: {
    setPets: (store, action) => {
      store.petData = action.payload
    },
    setLikes: (store, action) => {
      store.likedPets = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default pets;