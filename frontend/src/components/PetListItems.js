import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import user from '../reducers/user';

const PetListItems = ({ _id, name, photo }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);

  const handleLikedPet = (_id) => {
      if (!accessToken) {
        history.push('/login');
      } else {
        dispatch(user.actions.setLikes(_id));
      }
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
