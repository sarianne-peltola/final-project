import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { API_URL } from '../reusable/urls';
import { PET_URL } from '../reusable/urls';

const initialState = localStorage.getItem('user')
  ? {
      name: JSON.parse(localStorage.getItem('user')).name,
      email: JSON.parse(localStorage.getItem('user')).email,
      accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
      errors: null,
      interestPet: [],
      likedPets: []
    }
  : {
      name: null,
      email: null,
      accessToken: null,
      errors: null,
      interestPet: [],
      likedPets: []
    };

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (store, action) => {
      store.name = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setInterestPet: (store, action) => {
      store.interestPet = [action.payload, ...store.interestPet];
    },
    setLikes: (store, action) => {
      if (store.likedPets.includes(action.payload)) {
        const filterPet = store.likedPets.filter(pet => pet !== action.payload)
        store.likedPets = filterPet
      } else {
        store.likedPets = [action.payload, ...store.likedPets]
      }
    },
  }
});

export const sign = (name, email, password, mode) => {
  return (dispatch, getStore) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    };

    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setName(data.name));
            dispatch(user.actions.setEmail(data.email));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));
            dispatch(user.actions.setInterestPet(data.interestPet))

            localStorage.setItem(
              'user',
              JSON.stringify({
                name: data.name,
                email: data.email,
                accessToken: data.accessToken,
              })
            );
          });
        } else {
          dispatch(user.actions.setErrors(data));
        }
      });
  };
};

export const interestMessage = (
  accessToken,
  userName,
  email,
  petId,
  petName,
  message
) => {
  return (dispatch, getStore) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ userName, email, petId, petName, message }),
    };

    fetch(PET_URL(petId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setInterestPet(data.petId));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      });

  };
};

export default user;
