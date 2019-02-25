const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helpers = {
  encryptPassword: async plainPassword => {
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(plainPassword, salt)

    return {
      salt,
      hashedPassword
    }
  },

  comparePassword: async (password, hash) => {
    const authenticated = await bcrypt.compare(password, hash)

    return authenticated
  },

  createToken: async foundUser => {
    const payload = {
      sub: foundUser.id
    }

    const token = await jwt.sign(payload, process.env.SECRET)

    return token
  },

  verifyToken: async token => {
    try {
      const decoded = await jwt.verify(token, process.env.SECRET)
      return decoded
    } catch (error) {
      return error
    }
  },

  isAuthorized: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = await helpers.verifyToken(token)
      req.decoded = decoded // append decoded to req object
      next() // continue to next middleware
    } catch (error) {
      res.send({
        message: 'Error when check isAuthorized',
        error: error
      })
    }
  }
}

module.exports = helpers
