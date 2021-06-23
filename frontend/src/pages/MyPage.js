import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { API_URL } from '../reusable/urls';

const MyPage = () => {
  const history = useHistory();
  const [ProfileData, setProfileData] = useState({});
  const accessToken = useSelector((store) => store.user.accessToken);

  useEffect(() => {
    if (!accessToken) {
      history.push('/login');
    } else {
      const options = {
        method: 'GET',
        headers: {
          Authorization: accessToken,
        },
      };

      fetch(API_URL('mypage'), options)
        .then((res) => res.json())
        .then((data) => setProfileData(data));
    }
  }, [accessToken, history]);

  return (
    <Container>
      <InfoCard>
        <PageHeader>My page</PageHeader>
        <i className='fas fa-user fa-5x'></i>
        <Detail>
          <b>Name:</b> {ProfileData.name}
        </Detail>
        <Detail>
          <b>Email:</b> {ProfileData.email}
        </Detail>
        <BackLink to='/'>
          <i className='fas fa-arrow-left'></i>
        </BackLink>
      </InfoCard>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  background-color: #f6f6f6;
  border-radius: 20px 20px 0 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  height: 80vh;
`;

const InfoCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 5px 11px 20px 0px #e2e2e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center;

  @media (min-width: 500px) {
    width: 500px;
  }

  @media (min-width: 768px) {
    width: 600px;
  }

  @media (min-width: 1024px) {
    width: 800px;
  }
`;

const PageHeader = styled.h1`
  margin: 0 0 10p 0x;
`;

const Detail = styled.p`
  margin: 10px;
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
