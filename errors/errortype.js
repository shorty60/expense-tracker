class NoRecordsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'NoRecordsError'
  }
}

module.exports = {
  NoRecordsError,
}