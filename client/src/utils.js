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
