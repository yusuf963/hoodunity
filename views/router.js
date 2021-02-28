import express from 'express'
import controller from '../controller/user.js'

const router = express.Router()

//! User register and log in
router.route('/register')
  .post(controller.registeration)
router.route('/login')
  .post(controller.userLogIn)
//! route for updating and deleting user
router.route('/user')
  .get(controller.getAllUsers)
router.route('/user/?id')
  .put(controller.updateUser)
  .delete(controller.deleteUser)
//! routes for creating, updating and deleting objects



export default router