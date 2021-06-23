import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components/macro';

import { interestMessage } from '../reducers/user';
import { updateInterestPet } from '../reducers/user';
import SubmitMessage from '../components/SubmitMessage';

const Interest = (props) => {
  const { petId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);
  const userName = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const petName = props.location.propsName;
  const petPhoto = props.location.propsPhoto;
  const [message, setMessage] = useState('');
  const userID = useSelector((store) => store.user.userID);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      interestMessage(accessToken, userName, email, petId, petName, message)
    );
    dispatch(updateInterestPet(accessToken, userID, petId));
    setSubmitted(true);
  };

  return (
    <Container>
      {submitted ? (
        <SubmitMessage />
      ) : (
        <>
          <ProfileImage background={petPhoto}></ProfileImage>
          <BackLink to={`/pets/${petId}`}>
            <i className='fas fa-arrow-left'></i>
          </BackLink>
          <InterestForm onSubmit={onFormSubmit}>
            <FormLabel htmlFor='message'>
              Tell us about yourself and why are you interested in adopting{' '}
              {petName}?
            </FormLabel>
            <TextArea
              id='message'
              rows='6'
              cols='50'
              type='text'
              maxLength='250'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <CountDiv>
              <Count>{message.length}/250</Count>
            </CountDiv>
            <Adoption type='submit'>Send</Adoption>
          </InterestForm>
        </>
      )}
    </Container>
  );
};

export default Interest;

const Container = styled.div`
  background-color: #f6f6f6;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`;

const InterestForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormLabel = styled.label`
  text-align: center;
  margin: 10px 0;
`;

const TextArea = styled.textarea`
  background-color: #f9b95424;
  outline: none;
  resize: none;
  overflow: hidden;
  border: none;
  padding: 5px;
`;

const CountDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 5px 30px 0 0;
`;

const Count = styled.p`
  color: #c2c0c0;
  font-size: 13px;
  margin: 0;
`;

const Adoption = styled.button`
  border-radius: 20px;
  border: none;
  background-color: #fbce56;
  padding: 12px;
  width: 230px;
  margin: 15px;
  font-weight: bold;
  color: #000;
`;
