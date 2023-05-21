import mongoose from 'mongoose'

import { color } from '../util'

module.exports = () => {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI)
    return console.log(
      color('white', `🍃 Mongo URI not found, ${color('pink', 'skipping.')}`)
    )

  mongoose.set('strictQuery', false)

  mongoose
    .connect(`${MONGO_URI}`)
    .then(() =>
      console.log(
        color(
          'white',
          `🍃 MongoDB connection has been ${color('blue', 'established.')}`
        )
      )
    )
    .catch(() =>
      console.log(
        color(
          'white',
          `🍃 MongoDB connection has been ${color('pink', 'failed.')}`
        )
      )
    )
}
