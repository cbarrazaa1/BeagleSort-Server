const ArrayState = require('../ArrayState');

function generateArrayStates(origArr) {
  const arr = [...origArr];
  const n = origArr.length;
  const order = [0, 1, 2, 3, 4, 5, 6];
  const res = [];

  res.push(new ArrayState(order));
  for (let i = 0; i < n; i++) {
    let minimum = i;
    let j = i + 1;
    while (j < n) {
      if (arr[j] < arr[minimum]) {
        minimum = j;
      }
      j++;
    }

    if (minimum !== i) {
      const temp = arr[i];
      arr[i] = arr[minimum];
      arr[minimum] = temp;

      const temp2 = order[i];
      order[i] = order[minimum];
      order[minimum] = temp2;
      res.push(new ArrayState(order));
    }
  }

  return res;
}

module.exports = {
  generateArrayStates,
};
