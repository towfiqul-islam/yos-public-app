import React, {useReducer} from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {OPEN_CART, OPEN_SEARCH} from './types';

const AppState = props => {
  const initialState = {
    isCartOpen: false,
    isMobileSearchOpen: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  const toggleMobileSearch = () => {
    dispatch({
      type: OPEN_SEARCH,
      payload: !state.isMobileSearchOpen,
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
        toggleMobileSearch,
        openCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
