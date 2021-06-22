import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

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
    <>
      {submitted ? (
        <SubmitMessage />
      ) : (
        <form onSubmit={onFormSubmit}>
          <label htmlFor='message'>
            Tell us about yourself why are you interested in adopting {petName}?
          </label>
          <textarea
            id='message'
            rows='6'
            cols='50'
            type='text'
            maxLength='250'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div>
            <p>{message.length}/250</p>
          </div>
          <button type='submit'>Send</button>
        </form>
      )}
    </>
  );
};

export default Interest;
