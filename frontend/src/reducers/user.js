import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { API_URL } from '../reusable/urls';
import { PET_URL } from '../reusable/urls';

const initialState = localStorage.getItem('user')
  ? {
      userID: JSON.parse(localStorage.getItem('user')).userID,
      name: JSON.parse(localStorage.getItem('user')).name,
      email: JSON.parse(localStorage.getItem('user')).email,
      accessToken: JSON.parse(localStorage.getItem('user')).accessToken,
      errors: null,
      interestPet: JSON.parse(localStorage.getItem('user')).interestPet,
      likedPets: [],
    }
  : {
      userID: null,
      name: null,
      email: null,
      accessToken: null,
      errors: null,
      interestPet: null,
      likedPets: [],
    };

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserID: (store, action) => {
      store.userID = action.payload;
    },
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
      store.interestPet = action.payload;
    },
    setLikes: (store, action) => {
      if (store.likedPets.includes(action.payload)) {
        const filterPet = store.likedPets.filter(
          (pet) => pet !== action.payload
        );
        store.likedPets = filterPet;
      } else {
        store.likedPets = [action.payload, ...store.likedPets];
      }
    },
  },
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
            dispatch(user.actions.setUserID(data.userID));
            dispatch(user.actions.setName(data.name));
            dispatch(user.actions.setEmail(data.email));
            dispatch(user.actions.setAccessToken(data.accessToken));
            dispatch(user.actions.setErrors(null));
            dispatch(user.actions.setInterestPet(data.interestPet));

            localStorage.setItem(
              'user',
              JSON.stringify({
                userID: data.userID,
                name: data.name,
                email: data.email,
                accessToken: data.accessToken,
                interestPet: data.interestPet,
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
          batch(() => {
            dispatch(user.actions.setErrors(null));
            dispatch(user.actions.setInterestPet(data.petId));
          })
        } else {
          dispatch(user.actions.setErrors(data));
        }
      });
  };
};

export const updateInterestPet = (accessToken, userID, petId) => {
  return (dispatch, getStore) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify({ userID }),
    };

    fetch(PET_URL(petId), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      });
  };
};

export default user;
