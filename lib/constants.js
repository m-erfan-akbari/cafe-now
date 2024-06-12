export const watingTimeCalc = (productsCount) => productsCount * 40 + 180;

export const deliveryTime = () => {
  return Math.floor((Math.random() * 5 + 5) * 60) + 1;
};
