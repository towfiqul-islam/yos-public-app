import axios from 'axios';

export const discount = 5;

export function calculatePriceWithDiscount(price) {
  const percentageValue = (price / 100) * discount;
  const valueAfterDiscount = price - percentageValue;
  return valueAfterDiscount;
}

export function checkCarts(itemOnSearch, carts) {
  if (carts.length > 0) {
    for (const item of carts) {
      if (item.medicine_id === itemOnSearch.medicine_id) {
        return true;
      }
    }
    return false;
  }
  return false;
}

export function checkPath(pathName) {
  if (
    pathName === '/order-review' ||
    pathName === '/order-details' ||
    pathName === '/order-by-prescription' ||
    pathName === '/user-order-review' ||
    pathName === '/user-order-details' ||
    pathName === '/user-order-by-prescription'
  ) {
    return false;
  }
  return true;
}

export const onAddToCart = (med, carts, addToCart, calculateCartValue, qty) => {
  for (const item of carts) {
    if (med.medicine_id === item.medicine_id) {
      console.log('Item already in the Cart');
      return;
    }
  }

  carts.push({
    ...med,
    item_name: med.trade_name,
    quantity: parseInt(qty),
    price: med.unit_price * parseInt(qty),
  });
  addToCart(carts);
  calculateCartValue(carts);
  // onSearch('');
};

export function validateName(name) {
  const name_regex = /^[a-zA-Z ]*[a-zA-Z]{2}[a-zA-Z ]*$/g;
  if (name_regex.test(name)) return 'Name is valid';
  else return 'Name is invalid';
}
export function validatePhone(phone) {
  const phone_regex = /^[+]?([8]{2})?[0][1][3|4|5|6|7|8|9][0-9]{8}$/g;
  if (phone_regex.test(phone)) return 'Phone is valid';
  else return 'Phone is invalid';
}
export function validateAddress(address) {
  const address_regex_dhanmondi = /^.*[D|d][H|h]?[A|a][N|n][M|m][O|o][N|n][D|d][I|i].*$/g;
  const address_regex_jhigatola = /^.*[J|j|Z|z][H|h]?[I|i][G|g][A|a][T|t][O|o][L|l][A|a].*$/g;

  if (
    address_regex_dhanmondi.test(address) ||
    address_regex_jhigatola.test(address)
  )
    return 'Address is valid';
  else return 'Address is invalid';
}

export const getPageNumbers = total_count => {
  const total = parseInt(total_count);
  let divider = total / 10;
  divider = Math.ceil(divider);

  const pageNumber = [];

  for (let i = 1; i <= divider; i++) {
    pageNumber.push(i);
  }

  return pageNumber;
};

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const validateEmail = email => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const checkPassword = password => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  return re.test(String(password));
};

export const urlStrings = [
  'yQOFocNnzl',
  'W7duWPuchX',
  '7DuPG1RYqx',
  'u0afX56Tt0',
  '3SihQ9lGm9',
  'a8yYXqGCuH',
  'tfwcirNaQC',
  'B3cDzpawPu',
  'CVl6NJNcNQ',
  'WIk5xs8jR0',
  'SpMGd8jqPN',
  'M1PTMMuVhh',
  'x8jIDLish0',
  'h1I3sSR9SY',
  '10s7WmCmls',
  'zL0b0jA8Yd',
  '1JcDFsxFRn',
  'VGBZ8lClcZ',
  'URCv5BfJU8',
  'REaIg3Iykt',
  'NFFIuWjgJs',
  'jngMd4eAQi',
  'IkZOG6gQ86',
  'mTa6vbsegr',
  's1ypxDPdYf',
  'JqfStEmlG8',
  'Q6CQJT3r0v',
  'QXyAj8bBj5',
  'sdZ6NXFoNI',
  'toM1B5WfZn',
  'UftOE1I7pY',
  'pkocwEDLqO',
  '1G8uxstcf8',
  'bd0CoPU3iB',
  '3XYo41mI1w',
  'XdOCNUGpQC',
  'YxONRTtv2h',
  'bSYSMjdR1L',
  'tTznDv3b1e',
  'Ooh4iIeC0o',
  '690TjH8tDQ',
  'aG9orZOxFd',
  'NILj13Vo6G',
  'mB65NhwHzz',
  'Ej4a3GbzuV',
  'aJ1uAG969f',
  'xQYOnSmqld',
  'ZgcouDHNvR',
  'ppWPiWKyBC',
  'FnOfVqDyvc',
];

export const generateRandomNumber = () => Math.floor(Math.random() * 49);
