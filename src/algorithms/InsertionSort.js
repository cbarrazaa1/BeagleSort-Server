const ArrayState = require('../ArrayState');

function generateArrayStates(origArr) {
  const arr = [...origArr];
  const n = origArr.length;
  const order = [0, 1, 2, 3, 4, 5, 6];
  const res = [];
  let curr = 1;

  res.push(new ArrayState(order));
  while (curr < n) {
    let c = curr - 1;
    while (c >= 0 && arr[c] > arr[c + 1]) {
      const temp = arr[c + 1];
      arr[c + 1] = arr[c];
      arr[c] = temp;

      const temp2 = order[c + 1];
      order[c + 1] = order[c];
      order[c] = temp2;

      res.push(new ArrayState(order));
      c -= 1;
    }
    curr += 1;
  }

  return res;
}

module.exports = {
  generateArrayStates,
};
