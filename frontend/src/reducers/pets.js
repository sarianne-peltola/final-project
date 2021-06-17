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
      if (store.likedPets.includes(action.payload)) {
        const filterPet = store.likedPets.filter(pet => pet !== action.payload)
        store.likedPets = filterPet
      } else {
        store.likedPets = [action.payload, ...store.likedPets]
      }
      
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default pets;