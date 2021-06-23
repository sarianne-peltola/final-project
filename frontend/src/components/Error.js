import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Wrapper>
      <i className='fas fa-bug fa-3x'></i>
      <Message>Something went wrong!</Message>
      <BackLink to='/'>
        <i className='fas fa-arrow-left'></i>
      </BackLink>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  justify-content: center;
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

const Message = styled.div`
  padding: 20px;
`;
