import { createSlice } from '@reduxjs/toolkit'

const pets = createSlice({
  name: 'pets',
  initialState: {
    petData: [],
    likes: [],
    erros: []
  },
  reducers: {
    setPets: (store, action) => {
      store.petData = action.payload
    },
    setLikes: (store, action) => {
      store.likes = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default pets;