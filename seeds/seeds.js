import mongoose from 'mongoose'
import zodiacData from './data/zodiacs.js'
import userData from './data/users.js'
import { dbURI } from '../config/environment.js'
import Zodiac from '../models/zodiac.js'
import User from './models/user.js'

const seedDatabase = async () => {
  try {
    // connect to the database
    await mongoose.connect(dbURI) 
    console.log('🚀 Database Connected')

    // Drop all data from the database
    await mongoose.connection.db.dropDatabase()
    console.log('👌 Database dropped')

    // Create users
    const users =  await User.create(userData)
    console.log(`💁‍♀️ ${users.length} users added`)

    // Loop through zodiac data and apply an owner field to each object
    // with the id of the first user created above
    const zodiacsWithOwners = zodiacData.map(zod => {
      return { ...zod, owner: users[0]._id }
    })

    // Seed all the collections we have with our data
    const zodiacsAdded = await Zodiac.create(zodiacsWithOwners)
    console.log(`🌱 Seeded database with ${zodiacsAdded.length} zodiac signs`)

    // Close database connection
    await mongoose.connection.close()
    console.log('👋 Bye!')
  } catch (err) {
    console.log(err)
    // Close database connection
    await mongoose.connection.close()

  }
}
seedDatabase()
