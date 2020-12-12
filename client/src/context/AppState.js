import React, {useReducer} from 'react';
import AppContext from './appContext';
import AppReducer from './appReducer';

import {OPEN_CART} from './types';

const AppState = props => {
  const initialState = {
    isCartOpen: false,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

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
        openCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
