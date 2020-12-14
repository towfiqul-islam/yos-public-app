import React, {useReducer} from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {OPEN_CART, OPEN_SEARCH, OPEN_MENU} from './types';

const AppState = props => {
  const initialState = {
    isCartOpen: false,
    isMobileSearchOpen: false,
    isMenuOpen: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

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
