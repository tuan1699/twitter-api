import express from 'express'
import usersRoutes from '~/routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { initFolder } from './utils/file'
import mediasRoutes from './routes/medias.routes'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'

config()

const app = express()
const PORT = process.env.PORT || 3001

initFolder()
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/medias', mediasRoutes)
app.use('/static', staticRouter)

// work normally: http://localhost:3001/check-static/anrps5s1ka0vu16ajzxzl30s5.mp4
app.use('/check-static', express.static(UPLOAD_VIDEO_DIR))

databaseService.connect()

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

// app.get('/js', (req, res) => {
//   res.type('application/javascript')
//   res.send('console.log("Hello from JS!");')
// })

// // Endpoint trả về trang HTML
// app.get('/', (req, res) => {
//   res.type('text/html')
//   res.send(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//           <title>Test JavaScript</title>
//       </head>
//       <body>
//           <h1>Open Console to See Output</h1>
//           <script src="/js"></script>
//       </body>
//       </html>
//   `)
// })
