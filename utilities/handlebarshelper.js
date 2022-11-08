module.exports = {
  isMatched: (a, b, options) => {
    if (String(a) === String(b)) {
      return options.fn(this)
    } else {
      return options.inverse(this)
    }
  },
}