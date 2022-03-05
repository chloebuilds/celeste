import express from 'express'

import { getAllZodiacs, addZodiac, getSingleZodiac, updateZodiac, deleteZodiac } from '../controllers/zodiacController.js'
import { registerUser, loginUser } from '../controllers/userController.js'
import { secureRoute } from '../config/secureRoute.js'
// import { secureRoute } from './secureRoute'

// CONTROLLERS

// Defines the router on which we'll add all of our routes, methods and controllers
const router = express.Router()


// route adds a specific route to the router
// we can then attach method to that route by chaining

// To add a secureRoute to any route/method combination, we can add the secureRoute middleware before the controller function in the method

// GET ALL ZODIAC SIGNS
router.route('/zodiacs')
  .get(getAllZodiacs)
  .post(secureRoute, addZodiac)


// SINGLE ZODIAC
router.route('/zodiacs/:id')
  .get(getSingleZodiac)
  .put(secureRoute, updateZodiac)
  .delete(deleteZodiac)


// Auth routes
// Register
router.route('/register')
  .post(registerUser)

// Login
router.route('/login')
  .post(loginUser)


// We can export the router, which now contains all the routes, method and controllers we defined above
export default router