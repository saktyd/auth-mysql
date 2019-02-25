require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 8000

const all = require('./middlewares')
const users = require('./middlewares/users/index')

app.get('/', all.getHello)
app.get('/users', users.getAllUser)
app.get('/users/:id', users.getUserById)
app.delete('/users/:id', users.deleteUserById)
app.post('/users/register', users.register)

app.listen(port, () => {
  console.log(`Express app is listening on localhost:${port}`)
})
