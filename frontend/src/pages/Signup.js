import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { HeartFillIcon, MailIcon, KeyIcon } from '@primer/octicons-react';

import { sign } from '../reducers/user'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState(null);

  const dispatch = useDispatch()
  const accessToken = useSelector((store) => store.user.accessToken);
  const errors = useSelector((store) => store.user.errors);
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      history.push('/mypage')
    }
  }, [accessToken, history])

  const onFormSubmit = (e) => {
    e.preventDefault()
    dispatch(sign(name, email, password, mode))
  }

  return (
    <PageWrapper>
      <h2>Register as a user</h2>
      <Form onSubmit={onFormSubmit}>
      <Wrapper>
          <Container>
            <Heart size={24} />
            <InputBox
              id='name'
              maxLength='20'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Name'
            />
            <Label htmlFor='name'>Name</Label>
          </Container>
          <CountLine>
            <CharCount>{name.length}/20</CharCount>
          </CountLine>
        </Wrapper>
        <Wrapper>
          <Container>
            <Mail size={16} />
            <InputBox
              id='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
            />
            <Label htmlFor='email'>Email</Label>
          </Container>
        </Wrapper>
        <Wrapper>
          <Container>
            <Key size={16} />
            <InputBox
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <Label htlFor='password'>Password</Label>
          </Container>
        </Wrapper>
        <ButtonWrapper>
          <Button type='submit' onClick={() => setMode('login')}>
            Sign in
          </Button>
          <Button type='submit' onClick={() => setMode('signup')}>
            Register
          </Button>
        </ButtonWrapper>
      </Form>
      <Link to='/login'>Already an account? Sign in here</Link>
      {errors && <div>{errors.message}</div>}
    </PageWrapper>
  )
}

export default Signup;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Form = styled.form`
  width: 100%;
`;

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px 4px 0 0;
  display: flex;
  position: relative;
  box-sizing: border-box;
  max-width: 300px;
  height: 56px;
  :hover {
    background-color: #f1f1f1;
    border-bottom: px solid #606060;
  }
`;

const Heart = styled(HeartFillIcon)`
  position: absolute;
  top: 50%;
  left: 16px;
  right: initial;
  transform: translateY(-50%);
  color: #505050;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
`;

const Mail = styled(MailIcon)`
  position: absolute;
  top: 50%;
  left: 16px;
  right: initial;
  transform: translateY(-50%);
  color: #505050;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
`;

const Key = styled(KeyIcon)`
  position: absolute;
  top: 50%;
  left: 16px;
  right: initial;
  transform: translateY(-50%);
  color: #505050;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
`;

const InputBox = styled.input`
  border-radius: 4px 4px 0 0;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: inherit;
  text-transform: inherit;
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 20px 16px 16px 48px;
  border: none;
  border-bottom: 1px solid;
  background-color: inherit;
  outline: none;
  :focus {
    ::placeholder {
      opacity: 0;
    }
    padding: 20px 16px 6px 48px;
    background-color: #d3d3d3;
    border-bottom: 2px solid indigo;
    ::placeholder {
      color: indigo;
    }
    :focus + label {
      bottom: 20px;
      opacity: 1;
      color: indigo;
      font-size: 12px;
      z-index: 1;
    }
  }
`;

const Label = styled.label`
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
  transition: 0.2s;
  padding: 20px 16px 16px 48px;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: inherit;
  text-transform: inherit;
  z-index: -1;
`;

const CountLine = styled.div`
  display: flex;
  padding-top: 5px;
  padding-right: 16px;
  padding-left: 16px;
  justify-content: space-between;
  box-sizing: border-box;
`;

const CharCount = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-family: Roboto, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0333333333em;
  text-decoration: inherit;
  text-transform: inherit;
  display: block;
  margin-top: 0;
  line-height: normal;
  margin-left: auto;
  margin-right: 0;
  padding-left: 16px;
  padding-right: 0;
  white-space: nowrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: inline-block;
  padding: 7px 20px;
  border-radius: 25px;
  text-decoration: none;
  color: #fff;
  background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  background-image: linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  transition: 0.4s;
  border: none;
  margin: 15px;
  :hover {
    background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
    background-image: linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
  }
`;