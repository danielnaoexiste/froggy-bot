import { Schema, model } from 'mongoose'
import { IGuildPenalty } from '../types'

const GuildPenaltySchema = new Schema<IGuildPenalty>({
  guild_id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  target_user_id: {
    type: String,
    required: true
  },
  author_user_id: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    default: null
  },
  issued_on: {
    type: Date,
    required: true
  }
})

const GuildPenaltyModel = model('GuildPenalty', GuildPenaltySchema)

export default GuildPenaltyModel
