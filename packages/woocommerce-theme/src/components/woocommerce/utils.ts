/**
 * Utility to render a price.
 */
export const renderPrice = ({
  amount,
  quantity = 1,
  minorUnit = 2,
  decimalSeparator = ".",
  thousandSeparator = ",",
  prefix = "",
  suffix = "",
}) => {
  const value = `${parseInt(amount, 10) * quantity}`;

  // Get the integer part and add the thousand separator each three numbers.
  const integer = value
    .slice(0, -minorUnit)
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);

  // Get the fractional part.
  const fractional = value.slice(-minorUnit);

  return `${prefix}${integer}${decimalSeparator}${fractional}${suffix}`;
};
