

export function formatNumber(number) {
  const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};
  return number.toLocaleString(undefined, currencyOptions);
}
