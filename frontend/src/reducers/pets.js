import { createSlice } from '@reduxjs/toolkit'

const pets = createSlice({
  name: 'pets',
  initialState: {
    items: [],
    likes: []
  },
  reducers: {
    setPets: (store, action) => {
      store.items = action.payload
    },
    setLikes: (store, action) => {
      store.likes = action.payload
    }
  }
})

export default pets;