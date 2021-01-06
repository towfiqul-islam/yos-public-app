import React, {useReducer} from 'react';

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
  SET_LOADING,
  FILL_SEARCH,
  SET_USER,
  SET_AUTHENTICATION,
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
    isLoading: false,
    user: {},
    isAuthenticated: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setAuthentication = val => {
    dispatch({
      type: SET_AUTHENTICATION,
      payload: val,
    });
  };

  const setUser = user => {
    dispatch({
      type: SET_USER,
      payload: user,
    });
  };

  const setLoading = val => {
    dispatch({
      type: SET_LOADING,
      payload: val,
    });
  };

  const setAlert = val => {
    dispatch({
      type: SET_ALERT,
      payload: val,
    });
  };

  const fillSearchResults = data => {
    dispatch({
      type: FILL_SEARCH,
      payload: data,
    });
  };

  const onSearch = val => {
    dispatch({
      type: ON_SEARCH,
      payload: {
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
        isLoading: state.isLoading,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        setAuthentication,
        setUser,
        setLoading,
        setAlert,
        onSearch,
        calculateCartValue,
        addToCart,
        toggleMobileMenu,
        toggleMobileSearch,
        openCart,
        fillSearchResults,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
