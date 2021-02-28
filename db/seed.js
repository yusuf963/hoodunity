import mongoose from 'mongoose';
import connectToDatabase from '../config/connectToDB.js'
import User from '../model/registerationSchema.js'
import userData from './data/userData.js'

const seedingDatabases = async () => {
  try {
    await connectToDatabase()
    await mongoose.connection.db.dropDatabase()
    console.log('Database dropped')
    await User.create(userData())
    console.log('users data has been seeded into database')
    await mongoose.connection.close()
    console.log('Database closed')
  } catch (err) {
    await mongoose.connection.close()
    console.log('Database closed')
  }
}
// seedingDatabases()