import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { interestMessage } from '../reducers/user';

const Interest = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);
  const userName = useSelector((store) => store.user.name);
  const email = useSelector((store) => store.user.email);
  const [mode, setMode] = useState(null);
  const petName = props.location.propsName;
  const petId = props.location.propsId;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    }
  }, [accessToken, history]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(interestMessage(accessToken, userName, email, petId, petName, message, mode));
    setMessage('')
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor='message'>
        Tell us about yourself why you are interested in adopting {petName}
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
      <button type='submit' onClick={() => setMode('interest')}>
        Send
      </button>
    </form>
  );
};

export default Interest;
