import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { petList } from '../reducers/pets'
import PetListItems from './PetListItems'

const Main = () => {
  const dispatch = useDispatch()
  const petData = useSelector(store => store.pets.petData)

  useEffect(() => {
    dispatch(petList());
  }, [dispatch])

  
  return (
    <div>
      {petData ?
      petData.map(pet => (
      <PetListItems {...pet} key={pet._id} />
    )) : null }
    </div>
  )
}

export default Main;