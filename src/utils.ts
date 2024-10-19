export const isNumber = (value: unknown) => {
  return typeof value === 'number' && !isNaN(value);
};

export const isNull = (value: unknown) => {
  return typeof value === 'object' && value === null;
};

export const isUndefined = (value: unknown) => {
  return typeof value === 'undefined';
};

export const isNumericChar = (value: unknown) => {
  return !isNaN(Number(value));
};
