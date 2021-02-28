import jwToken from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import userCollection from '../model/registerationSchema.js'
// import page_404 from '../views/404.js'

//! user Registeration
async function registeration(req, res, next) {
  const body = req.body
  try {
    await userCollection.create(body)
    res.status(202).send({ message: 'Registeration successful' })
  } catch (err) {
    res.send('Something went worng during registeration, please try again. ' + err.message)
    next()
  }
}

//! User log in
async function userLogIn(req, res, next) {
  const password = req.body.password
  try {
    const checkingUser = await userCollection.findOne({ email: req.body.email })
    if (!checkingUser || !checkingUser.validatePassword(password)) {
      return res.status(401).res.send('Unothrized')
    }
    const token = jwToken.sign(
      { payload: checkingUser._id },
      secret,
      { expiresIn: '24h' }
    )
    res.status(202).send({ token, message: 'login successful' })
  } catch (err) {
    res.status().send('Something went worng during logging in, please try again. ' + err.message)
    next()
  }
}
//!  get request to all users
const getAllUsers = async (req, res, next) => {
  try {
    const usersList = await userCollection.find()
    res.send({ message: ' List of  all users' }, usersList)
  } catch (err) {
    res.status(407).send('Something went worng, please try again. ' + err.message)
    next()
  }
}

//! put request for updateing user account
const updateUser = async (req, res, next) => {
  const id = req.params.id
  const currentUser = req.currentUser
  const newBody = req.body
  try {
    const userToUpdate = await userCollection.findById(id)
    if (!userToUpdate) {
      return res.send({ message: 'No user found with that ID' })
    }
    if (!currentUser.isAdmin && !userToUpdate._id.equal(currentUser._id)) {
      return res.status(401).send({ message: 'Unauthroized' })
    }
    userToUpdate.set(newBody)
    userToUpdate.save()
    res.send(userToUpdate)
  } catch (err) {
    res.status(407).send('Something went worng, please try again. ' + err.message)
    next()
  }
}

//! delete request for user account
const deleteUser = async (req, res, next) => {
  const id = req.params.id
  const currentUser = req.currentUser
  try {
    const userToDelete = await userCollection.findById(id)
    if (!userToDelete) {
      return res.send({ message: 'No user found with that ID' })
    }
    if (!currentUser.isAdmin && !currentUser._id.equal(userToDelete._id)) {
      return res.status(401).send({ message: 'Unauthroized' })
    }
    await userToDelete.deleteOne()
  } catch (err) {
    return res.status(407).send({ message: 'Something went wrong please try again' }, err)
  }
}

export default {
  registeration,
  userLogIn,
  getAllUsers,
  updateUser,
  deleteUser
}