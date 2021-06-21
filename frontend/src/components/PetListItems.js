import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import user from '../reducers/user';

const PetListItems = ({ _id, name, photo, gender }) => {
  const dispatch = useDispatch();

  const handleLikedPet = (_id) => {
    dispatch(user.actions.setLikes(_id));
  };

  return (
    <div>
      <Link to={`/pets/${_id}`}>
        <img src={photo} alt={name} />
      </Link>
      <button onClick={() => handleLikedPet(_id)}>
        <i className='fas fa-heart'></i>
      </button>
    </div>
  );
};

export default PetListItems;
