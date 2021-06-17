import React from 'react';
import styled from 'styled-components/macro';


const Footer = () => {
  return (
    <FooterStyle>
      <p>Created by Sari-Anne Peltola</p>
      <p>Final project in Technigo Bootcamp</p>
      <span>Link to my Github: </span><a href="https://github.com/sarianne-peltola/">https://github.com/sarianne-peltola/final-project</a>
    </FooterStyle>
  )
};

export default Footer;

const FooterStyle = styled.footer`
  background: #f1f1f1;
`