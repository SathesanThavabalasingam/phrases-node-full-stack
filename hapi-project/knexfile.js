module.exports = {
  client: 'pg',
  connection: 'postgres://localhost/phrase_holder',
  migrations: {
    directory: __dirname + '/db/migrations'
  }
}
