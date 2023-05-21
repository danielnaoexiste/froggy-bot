import mongoose from 'mongoose'

export interface IGuildConfig extends mongoose.Document {
  guild_id: string
  penalties_channel_id: string
  reports_channel_id: string
  welcome_channel_id: string
}

export interface IGuildReport extends mongoose.Document {
  guild_id: string
  target_user_id: string
  author_user_id: string
  reason: string
  issued_on: Date
}

export interface IGuildPenalty extends IGuildReport {
  type: string
}
