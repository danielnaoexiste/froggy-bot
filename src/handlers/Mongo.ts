import mongoose from 'mongoose'

import { Client } from 'discord.js'
import { color } from '../util'
import GuildConfigModel from '../schemas/GuildConfig'

module.exports = (client: Client) => {
  const MONGO_URI = process.env.MONGO_URI
  if (!MONGO_URI)
    return console.log(
      color('white', `🍃 Mongo URI not found, ${color('pink', 'skipping.')}`)
    )

  mongoose.set('strictQuery', false)

  mongoose
    .connect(`${MONGO_URI}`)
    .then(async () => {
      const configs = await GuildConfigModel.find()
      configs.forEach(config => client.configs.set(config.guild_id, config))

      console.log(
        color(
          'white',
          `🍃 MongoDB connection has been ${color('blue', 'established.')}`
        )
      )
    })
    .catch(() =>
      console.log(
        color(
          'white',
          `🍃 MongoDB connection has been ${color('pink', 'failed.')}`
        )
      )
    )
}
