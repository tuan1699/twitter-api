import express from 'express'
// import usersRoutes from './routes/users.routes'
import usersRoutes from '~/routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const PORT = 3001

app.use(express.json())

app.get('/js', (req, res) => {
  res.type('application/javascript')
  res.send('console.log("Hello from JS!");')
})

// Endpoint trả về trang HTML
app.get('/', (req, res) => {
  res.type('text/html')
  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Test JavaScript</title>
      </head>
      <body>
          <h1>Open Console to See Output</h1>
          <script src="/js"></script>
      </body>
      </html>
  `)
})

app.use('/users', usersRoutes)

databaseService.connect()

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
