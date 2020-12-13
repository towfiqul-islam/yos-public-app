import {OPEN_CART, OPEN_SEARCH} from './types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;

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
  }
};
