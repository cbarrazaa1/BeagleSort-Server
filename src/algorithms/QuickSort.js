const ArrayState = require('../ArrayState');

function generateArrayStates(origArr) {
  const arr = [...origArr];
  const order = [0, 1, 2, 3, 4, 5, 6];
  const res = [];
  res.push(new ArrayState(order));

  quickSort(0, arr.length - 1);

  function quickSort(startIndex, endIndex) {
    if (startIndex > endIndex) {
      return;
    }

    const pivot = arr[startIndex];
    const pivot2 = order[startIndex];
    let left = startIndex + 1;
    let right = endIndex;

    while (left <= right) {
      if (arr[left] > pivot && arr[right] < pivot) {
        if (left !== right) {
          const temp = arr[left];
          arr[left] = arr[right];
          arr[right] = temp;

          const temp2 = order[left];
          order[left] = order[right];
          order[right] = temp2;

          res.push(new ArrayState(order));
        }
      }

      if (arr[left] <= pivot) {
        left++;
      }

      if (arr[right] >= pivot) {
        right--;
      }
    }

    if (startIndex !== right) {
      arr[startIndex] = arr[right];
      arr[right] = pivot;
      order[startIndex] = order[right];
      order[right] = pivot2;
      res.push(new ArrayState(order));
    }

    quickSort(startIndex, right - 1);
    quickSort(right + 1, endIndex);
  }
}

module.exports = {
  generateArrayStates,
};
