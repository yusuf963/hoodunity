import express from 'express'
import connectToDatabase from './config/connectToDB.js'


const app = express()

const startServer = async () => {
  // await connectToDatabase()
  app.use(express.json())

  app.use('/', (req, res, next) => {
    res.status(200).send('<h1>welcome to Home Page</h1>')
  })
}

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`listening on port, ${port}`)
})

startServer()