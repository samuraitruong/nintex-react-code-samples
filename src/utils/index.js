/* eslint-disable no-restricted-properties */
/* eslint-disable no-restricted-globals */
function round(input, decimal) {
  const digit = decimal || 2;
  let number = input;
  if (!number || isNaN(number)) {
    number = 0;
  }
  return Math.ceil(number * Math.pow(10, digit)) / Math.pow(10, digit);
}
export default {
  round,
};
