require('dotenv').config()

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'yourusername',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_DATABASE || 'yourdatabasename'
  }
})

const createTables = async () => {
  await knex.schema.dropTableIfExists('users')
  await knex.schema.createTable('users', function(table) {
    table.increments()
    table.string('name', 50)
    table.string('email', 50)
    table.string('salt')
    table.string('password')
    table.timestamps()
  })
}

createTables()
  .then(result => {
    console.log('Finished')
  })
  .catch(error => {
    console.log(error)
  })
