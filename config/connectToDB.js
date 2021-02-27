import mongoose from 'mongoose'
import { dbURI } from './environment.js'

const connectToDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
  return mongoose.connect(dbURI, options)
}

export default connectToDatabase
