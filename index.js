// IMPORT PACKAGES
import express from 'express' // Import express web framework
import mongoose from 'mongoose' // Import mongoose - ODM that interacts with our mongoDB server
import router from './config/routes.js' // Import all of our routes
import { port, dbURI } from './config/environment.js' // Import our environment variables

const app = express() 




// SETUP SERVER
const startServer = async () => {
  try {
    // Attempt mongodb connection
    await mongoose.connect(dbURI)
    console.log('✅ MongoDB connected')

    // MIDDLEWARE
    // JSON Parser
    app.use(express.json()) // Adds the body from the request as JSON to req.body (needs to happen before we use `req`)

    // LOGGER
    app.use((req, _res, next) => {
      console.log(`✨🌌 Request received: ${req.method} - ${req.url}`) // Generic log of request received
      next() // move on to next middleware
    })

    // ROUTES
    app.use(router)

    // CATCH ALL RESPONSE
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Route not found'})
    })


    // if successfully connected to mongoDB, start node server
    app.listen(port, () => console.log(`🤖 Server listening on port ${port}`))
  } catch (err) {
    console.log(err)
  }
}
startServer()