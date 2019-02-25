const helpers = require('../../helpers')
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'yourusername',
    password: process.env.DB_PASSWORD || 'yourpassword',
    database: process.env.DB_DATABASE || 'yourdatabasename'
  }
})

module.exports = {
  //Get list of users
  getAllUser: async (req, res) => {
    res.send({
      message: 'List of all users',
      users: await knex('users').select()
    })
  },

  register: async (req, res) => {
    const { salt, hashedPassword } = await helpers.encryptPassword(
      req.body.password
    )

    res.send({
      message: 'Register',
      user: await knex('users').insert({
        name: req.body.name,
        email: req.body.email,
        salt: salt,
        password: hashedPassword
      })
    })
  },

  //Get user by id
  getUserById: async (req, res) => {
    res.send({
      message: 'List of all users',
      user: await knex
        .select()
        .from('users')
        .where('id', Number(req.params.id))
    })
  },

  //Delete user by id
  deleteUserById: async (req, res) => {
    res.send({
      message: 'One user has been deleted',
      user: await knex('users')
        .where('id', req.params.id)
        .del()
    })
  }
}
