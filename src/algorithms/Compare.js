module.exports = function compare(actual, comparedTo, ascending) {
  if (ascending) {
    if (actual > comparedTo) {
      return true;
    } else {
      return false;
    }
  } else {
    if (actual < comparedTo) {
      return true;
    } else {
      return false;
    }
  }
};
