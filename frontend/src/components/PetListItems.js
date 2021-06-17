import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import pets from '../reducers/pets'

const PetListItems = ({ _id, name, photo, gender }) => {
  const dispatch = useDispatch()

  const handleLikedPet = (_id) => {
    dispatch(pets.actions.setLikes(_id))
  }

  return (
    <>
    <Link to={`/pets/${_id}`} key={_id}>
      <img src={photo} alt="{name}" />
    </Link>
    <button onClick={() => handleLikedPet(_id)}>
    <i className="fas fa-heart"></i>
    </button>
    </>
  )
}

export default PetListItems;