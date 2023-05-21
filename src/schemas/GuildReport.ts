import { Schema, model } from 'mongoose'
import { IGuildReport } from '../types'

const GuildReportSchema = new Schema<IGuildReport>({
  guild_id: {
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

const GuildReportModel = model('GuildReport', GuildReportSchema)

export default GuildReportModel
