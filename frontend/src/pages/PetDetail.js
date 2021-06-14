import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_URL } from '../reusable/urls';

import PetInfo from '../components/PetInfo'

const PetDetail = () => {
  const { petId } = useParams();
  const [petInfo, setPetInfo] = useState([]);
  const [error, setError] = useState(false)

  const PET_LINK = API_URL(`pets/${petId}`)

  useEffect(() => {
    fetch(PET_LINK)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setError(false)
          setPetInfo(data.singlePet)
        } else {
          setError(true)
        }
      });
  }, [petId, error, PET_LINK]);

  return (
  error ? <div>Erroooor</div> :
    <PetInfo {...petInfo} />
  )
};

export default PetDetail;
