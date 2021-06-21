import React from 'react';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

const Interest = () => {
  const history = useHistory()

  useEffect(() => {
    if (!accessToken) {
      history.push('/login')
    } else {
      const options = {
        method: 'POST',
        headers: {
          Authorization: accessToken,
        }
      }

      fetch(API_URL('mypage'), options)
      .then((res) => res.json())
      .then((data) => setProfileData(data))
    }
  }, [accessToken, history])

  return <div>Interest Form</div>;
};

export default Interest;
