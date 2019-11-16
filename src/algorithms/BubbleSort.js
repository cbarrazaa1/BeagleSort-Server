const ArrayState = require('../ArrayState');

function generateArrayStates(origArr) {
  const arr = [...origArr];
  const order = [0, 1, 2, 3, 4, 5, 6];
  const res = [];
  let limit = origArr.length - 2;
  let changed = true;

  res.push(new ArrayState(order));
  while (changed && limit > 0) {
    changed = false;
    for (let i = 0; i <= limit; i++) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        const temp2 = order[i];
        order[i] = order[i + 1];
        order[i + 1] = temp2;
        res.push(new ArrayState(order));
        changed = true;
      }
    }
    limit -= 1;
  }

  return res;
}

module.exports = {
  generateArrayStates,
};
