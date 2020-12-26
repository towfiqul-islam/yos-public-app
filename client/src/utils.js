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
    pathName === '/order-by-prescription'
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
  const name_regex = /^[a-zA-Z ][a-zA-Z ][a-zA-Z ]+$/g;
  if (name_regex.test(name)) return 'Name is valid';
  else return 'Name is invalid';
}
export function validatePhone(phone) {
  const phone_regex = /^[0][1][3|4|5|6|7|8|9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/g;
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
