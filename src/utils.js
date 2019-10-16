export const buildBlock = (value) => ({ isVisible: !!value, value : value || undefined })
export const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);