import { Schema, model } from 'mongoose'
import { IGuildConfig } from '../types'

const GuildConfigSchema = new Schema<IGuildConfig>({
  guild_id: {
    type: String,
    unique: true,
    required: true
  },
  penalties_channel_id: {
    type: String,
    default: null
  },
  reports_channel_id: {
    type: String,
    default: null
  },
  welcome_channel_id: {
    type: String,
    default: null
  }
})

const GuildConfigModel = model('GuildConfig', GuildConfigSchema)

export default GuildConfigModel
