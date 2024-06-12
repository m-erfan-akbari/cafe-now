export function formatCurrency(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the string into an array of digits (reversed)
  const digits = numberString.split("").reverse();
  const newString = digits.map((d, index) => {
    if ((index + 1) % 3 !== 0) {
      return d;
    } else if (index + 1 === digits.length) {
      return d;
    } else {
      return `${d},`;
    }
  });

  return newString.join("").split("").reverse().join("");
}
