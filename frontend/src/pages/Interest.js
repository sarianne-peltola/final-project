import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { API_URL } from '../reusable/urls';
import { interestMessage } from '../reducers/user'
import pets from '../reducers/pets';

const Interest = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [interestMessage, setInterestMessage] = useState('')
  const accessToken = useSelector((store) => store.user.accessToken);
  const userName = useSelector((store) => store.user.name)
  const email = useSelector((store) => store.user.email)
  const [mode, setMode] = useState(null);
  const petName = props.location.propsName

  console.log(petName)

  useEffect(() => {
    if (accessToken) {
      history.push('/mypage')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(interestMessage(userName, petName, email, mode))
  }

  return <div>{interestMessage}</div>;
};

export default Interest;
