

export const getFinalPrice = (price, discount) => {
  if (!discount || discount <= 0) {
    return price;
  }

  return Math.round(price - (price * discount) / 100);
};
