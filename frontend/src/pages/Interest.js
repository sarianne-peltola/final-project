import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { API_URL } from '../reusable/urls';

const Interest = () => {
  const history = useHistory()
  const [interestMessage, setInterestMessage] = useState('')
  const accessToken = useSelector((store) => store.user.accessToken);


  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    } else {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        }
      }

      fetch(API_URL('interest'), options)
      .then((res) => res.json())
      .then((data) => setInterestMessage(data))
    }
  }, [accessToken, history])

  return <div>{interestMessage}</div>;
};

export default Interest;
