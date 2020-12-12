import {OPEN_CART} from './types';

export default (state, action) => {
  switch (action.type) {
    default:
      return state;

    case OPEN_CART:
      return {
        ...state,
        isCartOpen: action.payload,
      };
  }
};
