import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';

import user from '../reducers/user';

const PetListItems = ({ _id, name, gender, age, photo, breed }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);
  const [isActive, setIsActive] = useState(false);

  const handleLikedPet = (_id) => {
    if (!accessToken) {
      history.push('/login');
    } else {
      dispatch(user.actions.setLikes(_id));
      setIsActive(!isActive);
    }
  };

  return (
    <ContainerBox>
      <LinkBox to={`/pets/${_id}`}>
        <Picture background={photo}></Picture>
        <InfoBox>
          <Flex>
            <Header>{name}</Header>
            <Symbol>
              {gender === 'Male' ? (
                <i className='fas fa-mars'></i>
              ) : (
                <i className='fas fa-venus'></i>
              )}
            </Symbol>
          </Flex>
          <Breed>{breed}</Breed>
          <Age>{age} old</Age>
        </InfoBox>
      </LinkBox>
      {isActive ? (
        <HeartActive onClick={() => handleLikedPet(_id)}>
          <i className='fas fa-heart'></i>
        </HeartActive>
      ) : (
        <Heart onClick={() => handleLikedPet(_id)}>
          <i className='fas fa-heart'></i>
        </Heart>
      )}
    </ContainerBox>
  );
};

export default PetListItems;

const ContainerBox = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 10px 0;

  @media (min-width: 550px) {
    width: 480px;
  }
  @media (min-width: 1024px) {
    margin: 0 0 20px 0;
  }
`;

const LinkBox = styled(Link)`
  display: flex;
  width: 100%;
  height: 230px;
  text-decoration: none;
  color: #787878;

  @media (min-width: 550px) {
    height: 280px;
  }
`;

const Picture = styled.div`
  width: 60%;
  height: 100%;
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  border-radius: 25px;
  box-shadow: 5px 11px 20px 0px #e2e2e2;
`;

const InfoBox = styled.div`
  width: 40%;
  height: 80%;
  background-color: #fff;
  border-radius: 0 25px 25px 0;
  box-shadow: 5px 11px 20px 0px #e2e2e2;
  padding: 15px;
  align-self: center;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const Header = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
`;

const Breed = styled.h3`
  margin: 8px 0;
  font-size: 14px;
  font-weight: 700;
`;

const Age = styled.p`
  margin: 10px 0;
  font-size: 13px;
  color: #cac7c7;
`;

const Symbol = styled.p`
  color: #cac7c7;
  margin: 2px 0 0 0;
  padding: 0 5px;
  font-size: 18px;
`;

const Heart = styled.button`
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  right: 50px;
  bottom: 39px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #bebebed0;
  :active {
    transform: translateY(2px);
  }

  @media (min-width: 425px) {
    right: 60px;
  }

  @media (min-width: 550px) {
    right: 80px;
  }
`;

const HeartActive = styled.button`
  background-color: rgb(255 242 228);
  border-radius: 50%;
  position: absolute;
  z-index: 1;
  right: 60px;
  bottom: 39px;
  width: 40px;
  height: 40px;
  border: none;
  :active {
    transform: translateY(2px);
  }
`;
