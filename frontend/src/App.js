import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import pets from './reducers/pets';
import user from './reducers/user';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const reducer = combineReducers({
  pets: pets.reducer,
  user: user.reducer,
});

const store = configureStore({ reducer });

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
        </Switch>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
