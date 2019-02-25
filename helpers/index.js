const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
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
      sub: foundUser._id
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
  }
}
