import { createSlice } from '@reduxjs/toolkit'

const pets = createSlice({
  name: 'pets',
  initialState: {
    petData: [],
    errors: []
  },
  reducers: {
    setPets: (store, action) => {
      store.petData = action.payload
    },
    setErrors: (store, action) => {
      store.errors = action.payload
    }
  }
})

export default pets;