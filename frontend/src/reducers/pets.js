import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { API_URL } from '../reusable/urls';

const initialState = localStorage.getItem('pets')
  ? {
      petData: JSON.parse(localStorage.getItem('pets')).petData,
      errors: null,
    }
  : {
      petData: [],
      errors: null,
    };

const pets = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setPets: (store, action) => {
      store.petData = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
  },
});

export const petList = () => {
  return (dispatch, getStore) => {
    fetch(API_URL('pets'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(pets.actions.setPets(data.allPets));
            dispatch(pets.actions.setErrors(null));

            localStorage.setItem(
              'pets',
              JSON.stringify({
                petData: data.allPets,
              })
            );
          });
        } else {
          dispatch(pets.actions.setErrors(data));
        }
      });
  };
};

export default pets;
