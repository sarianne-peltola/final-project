import { createSlice } from '@reduxjs/toolkit'

import { API_URL } from '../reusable/urls'

const initialState = localStorage.getItem('user')
  ? {
    name: JSON.parse(localStorage.getItem('user')).name,
    email: JSON.parse(localStorage.getItem('user')).email,
    accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
    errors: null
  }
  : {
    name: null,
    email: null,
    accessToken: null,
    errors: null
  }

  const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setName: (store, action) => {
        store.name = action.payload
      },
      setEmail: (store, action) => {
        store.email = action.payload
      },
      setAccessToken: (store, action) => {
        store.accessToken = action.payload
      },
      setErrors: (store, action) => {
        store.errors = action.payload
      }
    }
  })


  export default user;