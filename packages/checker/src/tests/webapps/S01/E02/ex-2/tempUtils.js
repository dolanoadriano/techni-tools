const countAvg = (array) => {
  return array.reduce((acc, curr) => acc + curr, 0) / array.length;
};
