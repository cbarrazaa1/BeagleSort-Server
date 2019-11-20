const ArrayState = require('../ArrayState');
const cmp = require('./Compare');

function generateArrayStates(origArr, ascending) {
  const arr = [...origArr];
  const n = arr.length;
  const order = [0, 1, 2, 3, 4, 5, 6];
  const res = [];
  let i = n - 1;

  res.push(new ArrayState(order));
  while (i >= 1) {
    for (let j = 0; j <= i - 1; j++) {
      if (cmp(arr[j], arr[j + 1], ascending)) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        const temp2 = order[j];
        order[j] = order[j + 1];
        order[j + 1] = temp2;
        res.push(new ArrayState(order));
      }
    }
    i--;
  }

  return res;
}

module.exports = {
  generateArrayStates,
};
