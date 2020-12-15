import {
  OPEN_CART,
  OPEN_SEARCH,
  OPEN_MENU,
  ADD_TO_CART,
  CART_VALUE,
  ON_SEARCH,
  SET_ALERT,
} from './types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;

    case SET_ALERT:
      return {
        ...state,
        isAlertOpen: action.payload,
      };

    case ON_SEARCH:
      return {
        ...state,
        searchResults: action.payload.data,
        search: action.payload.searchVal,
      };

    case CART_VALUE:
      return {
        ...state,
        cartValue: action.payload,
      };

    case OPEN_CART:
      return {
        ...state,
        isCartOpen: action.payload,
      };

    case OPEN_SEARCH:
      return {
        ...state,
        isMobileSearchOpen: action.payload,
      };

    case OPEN_MENU:
      return {
        ...state,
        isMenuOpen: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        carts: action.payload,
      };
  }
};
