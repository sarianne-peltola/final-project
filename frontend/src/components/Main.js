import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { petList } from '../reducers/pets'
import PetListItems from './PetListItems'
import Header from './Header'

const Main = () => {
  const dispatch = useDispatch()
  const petData = useSelector(store => store.pets.petData)

  useEffect(() => {
    dispatch(petList());
  }, [dispatch])

  
  return (
    <>
    <Header />
    <Container>
      {petData ?
      petData.map(pet => (
      <PetListItems {...pet} key={pet._id} />
    )) : null }
    </Container>
    </>
  )
}

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F6F6F6;
  border-radius: 20px 20px 0 0;
  padding: 20px;
`;