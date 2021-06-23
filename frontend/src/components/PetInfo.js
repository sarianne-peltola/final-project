import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';

import user from '../reducers/user';

const PetInfo = ({
  _id,
  breed,
  age,
  gender,
  size,
  name,
  photo,
  description,
}) => {
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
    <Container>
      <ProfileImage background={photo}>
        <BackLink className='back-link' to='/'>
          <i className='fas fa-arrow-left'></i>
        </BackLink>
      </ProfileImage>
      <InfoWrapper>
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
        <Flex>
          <Breed>{breed}</Breed>
          <Age>
            <i className='far fa-clock'></i>
            <AgeText>{age}</AgeText>
          </Age>
        </Flex>
        <Flex>
          <Description>{description}</Description>
          <SizeFlex>
            <i className='fas fa-paw fa-sm'></i>
            <i className='fas fa-paw fa-lg'></i>
            <Size>{size}</Size>
          </SizeFlex>
        </Flex>
      </InfoWrapper>
      <EndWrapper>
        {isActive ? (
          <HeartActive onClick={() => handleLikedPet(_id)}>
            <i className='fas fa-heart'></i>
          </HeartActive>
        ) : (
          <Heart onClick={() => handleLikedPet(_id)}>
            <i className='fas fa-heart'></i>
          </Heart>
        )}
        <Link to={{ pathname: `/pets/${_id}/interest`, propsName: name }}>
          <Adoption>Adoption</Adoption>
        </Link>
      </EndWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 75vh;
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  position: relative;
  background-position: center;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 50px;
  left: 20px;
  z-index: 1;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #adadad2e;
  color: #000;
`;

const InfoWrapper = styled.div`
  box-shadow: 5px 11px 20px 0px #e2e2e2;
  border-radius: 20px;
  padding: 18px 18px 18px 25px;
  width: 75%;
  position: relative;
  top: -50px;
  background-color: #fff;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px 0;
`;

const Header = styled.h1`
  color: #787878;
  margin: 0;
`;

const Symbol = styled.p`
  color: #787878;
  margin: 5px 0 0 0;
  padding: 0 15px;
  font-size: 24px;
`;

const Breed = styled.p`
  color: #787878;
  margin: 5px 0;
  font-size: 18px;
`;

const Age = styled.div`
  color: #787878;
  margin: 5px 0 0 0;
  font-size: 15px;
  display: flex;
`;

const AgeText = styled.p`
  margin: 0 0 0 5px;
`;

const Description = styled.p`
  color: #787878;
  margin: 5px 0;
  font-size: 14px;
`;

const SizeFlex = styled.div`
  display: flex;
  color: #787878;
  font-size: 14px;
`;

const Size = styled.p`
  margin: 5px 0 0 5px;
`;

const Heart = styled.button`
  background-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 1px solid #bebebed0;
  :active {
    transform: translateY(2px);
  }
`;

const HeartActive = styled.button`
  background-color: rgb(255 242 228);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  :active {
    transform: translateY(2px);
  }
`;

const Adoption = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #fbce56;
  padding: 12px;
  width: 230px;
  margin: 15px;
  font-weight: bold;
  color: #656565;
`;

const EndWrapper = styled.div`
  position: relative;
  top: -15px;
`;

export default PetInfo;
