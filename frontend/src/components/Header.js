import React from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import user from '../reducers/user';

const Header = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setName(null));
      dispatch(user.actions.setEmail(null));
      dispatch(user.actions.setUserID(null));
      dispatch(user.actions.setInterestPet(null));

      localStorage.removeItem('user');
    });
  };

  return (
    <HeaderWrapper>
      <FlexWrapper>
        <Link to='/login'>
          <Log>
            <i className='fas fa-user-circle'></i>
          </Log>
        </Link>
        <TitleLink to='/'>
          <i className='fas fa-paw fa-2x'></i>
          <Title>Adopt Me</Title>
        </TitleLink>
        {accessToken && (
          <Log onClick={onButtonClick}>
            <i className='fas fa-sign-out-alt'></i>
          </Log>
        )}
      </FlexWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 5px 20px;
`;

const TitleLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #000;
`;

const Title = styled.h1`
  font-family: 'Righteous', cursive;
  display: inline;
  margin: 1px 5px 0 5px;
  font-size: 30px;
`;

const Log = styled.button`
  border-radius: 50%;
  border: none;
  width: 35px;
  height: 35px;
  background-color: #fff;
  color: #fbce56;
  cursor: pointer;
`;
