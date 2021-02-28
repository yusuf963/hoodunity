import express from 'express'
import connectToDatabase from './config/connectToDB.js'
import router from './views/router.js'

const app = express()
const startServer = async () => {
  await connectToDatabase()
  console.log("connectToDatabase")
  app.use(express.json())

  app.use('/api', router)

  const port = process.env.PORT || 8000
  app.listen(port, () => {
    console.log(`listening on port, ${port}`)
  })
}

startServer()