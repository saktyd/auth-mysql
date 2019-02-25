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

    await knex('users').insert({
      name: req.body.name,
      email: req.body.email,
      salt: salt,
      password: hashedPassword
    })

    res.send({
      message: 'Successfully register user',
      name: req.body.name,
      email: req.body.email
    })
  },

  login: async (req, res) => {
    const foundUser = await knex('users')
      .where('email', req.body.email)
      .first()
    // return one object instead of array

    const authenticated = await helpers.comparePassword(
      req.body.password,
      foundUser.password
    )
    console.log(authenticated)

    // create token with JWT
    const token = await helpers.createToken(foundUser)

    res.send({
      message: 'Login with registered user',
      foundUser: {
        name: foundUser.name,
        email: foundUser.email
      },
      authenticated: authenticated,
      token: token
    })
  },

  //Get user by id
  getUserById: async (req, res) => {
    res.send({
      message: 'List of all users',
      user: await knex('users').where('id', Number(req.params.id))
    })
  },

  //Delete user by id
  deleteUserById: async (req, res) => {
    const id = Number(req.params.id)

    // if id is the same with authorized logged in user's subject key
    if (req.decoded.sub === id) {
      res.send({
        message: 'One user has been deleted',
        status: await knex('users')
          .where('id', id)
          .del()
      })
    } else {
      res.send({
        message: 'Failed to delete user, you are not authorized'
      })
    }
  }
}
