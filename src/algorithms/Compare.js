module.exports = function compare(ascending, actual, comparedTo) {
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
