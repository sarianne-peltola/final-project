import React from 'react';
import styled from 'styled-components/macro';

const Footer = () => {
  return (
    <FooterStyle>
      <FooterHeader>Final project in Technigo Bootcamp 2021</FooterHeader>
      <p>Created by Sari-Anne Peltola</p>
      <div>
        <SocialMedia href='https://github.com/sarianne-peltola/'>
          <i class='fab fa-github'></i>
        </SocialMedia>
        <SocialMedia href='https://www.linkedin.com/in/sari-anne-peltola-55933b10a/'>
          <i class='fab fa-linkedin'></i>
        </SocialMedia>
      </div>
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.footer`
  background: #dae4ff7d;
  color: #000;
  font-size: 12px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterHeader = styled.h2`
  font-size: 15px;
  margin: 5px;
`;

const SocialMedia = styled.a`
  text-decoration: none;
  color: #000;
  font-size: 20px;
  margin-right: 5px;
`;
