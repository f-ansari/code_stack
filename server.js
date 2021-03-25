const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')
// const compression = require('compression')

const AppRouter = require('./routes/index')
const app = express()

const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(cors())
// app.use(compression({ level: 8 }))
app.use(bodyParser.json())

app.use('/api', AppRouter)

app.get('/', (req, res) => res.json({ message: 'Server Works' }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))
