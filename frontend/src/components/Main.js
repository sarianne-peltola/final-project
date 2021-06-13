import React, { useEffect } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../reusable/urls'

import pets from '../reducers/pets'

const Main = () => {
  const petData = useSelector(store => store.pets.petData)

  const dispatch = useDispatch()

  useEffect(() => {
    fetch(API_URL('pets'))
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        batch(() => {
          dispatch(pets.actions.setPets(data.allPets))
          dispatch(pets.actions.setErrors(null))
        })
      } else {
        dispatch(pets.actions.setErrors(data))
      }
    })
  }, [])

  console.log(petData)
  return (
    <div>All the pets stuff here</div>
  )
}

export default Main;