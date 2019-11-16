class ArrayState {
  constructor(arr) {
    this.arr = [...arr];
  }

  compareWith(other) {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i] !== other.arr[i]) {
        return false;
      }
    }

    return true;
  }
}

module.exports = ArrayState;
