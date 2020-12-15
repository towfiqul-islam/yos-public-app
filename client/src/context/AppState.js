import React, {useReducer} from 'react';
import {data} from '../data';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {
  OPEN_CART,
  OPEN_SEARCH,
  OPEN_MENU,
  ADD_TO_CART,
  CART_VALUE,
  ON_SEARCH,
  SET_ALERT,
} from './types';

const AppState = props => {
  const initialState = {
    isCartOpen: false,
    isMobileSearchOpen: false,
    isMenuOpen: false,
    carts: [],
    cartValue: 0,
    search: '',
    searchResults: [],
    isAlertOpen: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setAlert = val => {
    dispatch({
      type: SET_ALERT,
      payload: val,
    });
  };

  const onSearch = val => {
    dispatch({
      type: ON_SEARCH,
      payload: {
        data,
        searchVal: val,
      },
    });
  };

  const calculateCartValue = carts => {
    dispatch({
      type: CART_VALUE,
      payload: carts.reduce((acc, curr) => acc + curr.price, 0),
    });
  };

  const addToCart = cartItems => {
    dispatch({
      type: ADD_TO_CART,
      payload: cartItems,
    });
    localStorage.setItem('carts', JSON.stringify(cartItems));
  };

  const toggleMobileMenu = value => {
    dispatch({
      type: OPEN_MENU,
      payload: value,
    });
  };

  const toggleMobileSearch = value => {
    dispatch({
      type: OPEN_SEARCH,
      payload: value,
    });
  };

  const openCart = () => {
    dispatch({
      type: OPEN_CART,
      payload: !state.isCartOpen,
    });
  };

  return (
    <AppContext.Provider
      value={{
        isCartOpen: state.isCartOpen,
        isMobileSearchOpen: state.isMobileSearchOpen,
        isMenuOpen: state.isMenuOpen,
        carts: state.carts,
        cartValue: state.cartValue,
        search: state.search,
        searchResults: state.searchResults,
        isAlertOpen: state.isAlertOpen,
        setAlert,
        onSearch,
        calculateCartValue,
        addToCart,
        toggleMobileMenu,
        toggleMobileSearch,
        openCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
