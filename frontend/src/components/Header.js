import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' ? (
        <Link className='back-link' to='/'>
          <i class="fas fa-arrow-left"></i>
        </Link>
      ) : (
        <Link className='back-link' to='/'>
          <i class='fas fa-bars'></i>
        </Link>
      )}
    </div>
  );
};

export default Header;
