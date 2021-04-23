const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)        // untuk ngapus data

module.exports = { unlinkAsync }
