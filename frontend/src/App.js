import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import pets from './reducers/pets';
import user from './reducers/user';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyPage from './pages/MyPage'
import Interest from './pages/Interest'

import PetDetail from './pages/PetDetail'

const reducer = combineReducers({
  pets: pets.reducer,
  user: user.reducer,
});

const store = configureStore({ reducer });

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/pets/:petId' component={PetDetail}/>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/mypage' component={MyPage} />
          <Route exact path='/pets/:petId/interest' component={Interest} />
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
