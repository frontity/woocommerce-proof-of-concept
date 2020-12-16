/**
 * Utility to render a price.
 */
export const renderPrice = ({
  quantity = 1,
  amount,
  currency,
}: {
  quantity?: number;
  amount: string;
  currency: {
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
}) => {
  // Get the currency props.
  const {
    currency_minor_unit,
    currency_decimal_separator,
    currency_thousand_separator,
    currency_prefix,
    currency_suffix,
  } = currency;

  // Get the final value in string format.
  const value = `${parseInt(amount, 10) * quantity}`.padStart(
    currency_minor_unit + 1,
    "0"
  );

  // Get the integer part and add the thousand separator each three numbers.
  const integer = value
    .slice(0, -currency_minor_unit)
    .replace(/\B(?=(\d{3})+(?!\d))/g, currency_thousand_separator);

  // Get the fractional part.
  const fractional = value.slice(-currency_minor_unit);

  // Add prefix, suffix, etc. and return the value.
  return `${currency_prefix}${integer}${currency_decimal_separator}${fractional}${currency_suffix}`;
};
