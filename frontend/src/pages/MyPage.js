import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import { API_URL } from '../reusable/urls';

const MyPage = () => {
  const history = useHistory()
  const [ProfileData, setProfileData] = useState({})
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

      fetch(API_URL('mypage'), options)
      .then((res) => res.json())
      .then((data) => setProfileData(data))
    }
  }, [accessToken, history])

  return (
    <>
    <p>{ProfileData.name}</p>
    <p>{ProfileData.email}</p>
  </>
  )
}

export default MyPage;