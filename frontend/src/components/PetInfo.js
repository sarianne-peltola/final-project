import React from 'react';

const PetInfo = ({
  _id,
  colors,
  age,
  gender,
  size,
  coat,
  name,
  photo,
}) => {
  return (
    <div>
      <img src={photo} alt='{name}' />
      <i class="fas fa-heart"></i>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>Size: {size}</p>
      <p>Coat: {coat}</p>
      <p>Color: {colors}</p>
    </div>
  );
};

export default PetInfo;
