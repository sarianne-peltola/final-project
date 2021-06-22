import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import user from '../reducers/user';

const PetInfo = ({ _id, colors, age, gender, size, coat, name, photo }) => {
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
      <div>
        <img src={photo} alt='{name}' />
        <button onClick={() => handleLikedPet(_id)}>
          <i className='fas fa-heart'></i>
        </button>
        <h1>{name}</h1>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Size: {size}</p>
        <p>Coat: {coat}</p>
        <p>Color: {colors}</p>
      </div>
      <div>
        <h2>Think you and {name} might be a match?</h2>
        <Link to={{ pathname: `/pets/${_id}/interest`, propsName: name }}>
          <button>Introduce myself</button>
        </Link>
      </div>
    </div>
  );
};

export default PetInfo;
