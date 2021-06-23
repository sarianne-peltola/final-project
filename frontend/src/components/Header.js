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
        {accessToken && (
          <Log onClick={onButtonClick}>
            <i class='fas fa-sign-out-alt'></i>
          </Log>
        )}
      </FlexWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
`

const Log = styled.button`
  border-radius: 50%;
  border: none;
  width: 30px;
  height: 30px;
  background-color: #fff;
  color: #fbce56;
`;