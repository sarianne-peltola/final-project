import React from 'react';
import styled from 'styled-components/macro';

const SubmitMessage = () => {
  return (
    <Wrapper>
      <i className='fas fa-envelope fa-3x'></i>
      <div>Thank you for your interest!</div>
    </Wrapper>
  );
};

export default SubmitMessage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  justify-content: center;
`
