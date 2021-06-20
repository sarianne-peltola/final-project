import React from 'react';
import { batch, useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import user from '../reducers/user';

const Header = () => {
  const location = useLocation();
  const accessToken = useSelector((store) => store.user.accessToken);
  const dispatch = useDispatch();

  const onButtonClick = () => {
    batch(() => {
      dispatch(user.actions.setAccessToken(null));
      dispatch(user.actions.setName(null));
      dispatch(user.actions.setEmail(null));

      localStorage.removeItem('user');
    });
  };

  return (
    <header>
      <div>
        {location.pathname !== '/' ? (
          <Link className='back-link' to='/'>
            <i className='fas fa-arrow-left'></i>
          </Link>
        ) : (
          <Link className='back-link' to='/'>
            <i className='fas fa-bars'></i>
          </Link>
        )}
      </div>
      <div>
        <Link to='/login'>
        <i className="fas fa-user-circle"></i>
        </Link>
        {accessToken && <button onClick={onButtonClick}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
