require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000

app.use(bodyParser.json())

const all = require('./middlewares')
const users = require('./middlewares/users')

app.get('/', all.getHello)
app.post('/register', users.register)
app.post('/login', users.login)
app.get('/users', users.getAllUser)
app.get('/users/:id', users.getUserById)
app.delete('/users/:id', users.deleteUserById)

app.listen(port, () => {
  console.log(`Express app is listening on localhost:${port}`)
})
