// user.js

const Bookshelf = require('../bookshelf')
const Phrases = Bookshelf.Model.extend({
  tableName: 'phrases',
})
module.exports = Phrases
