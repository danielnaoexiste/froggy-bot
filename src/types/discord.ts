import {
  Collection,
  SlashCommandBuilder,
  CommandInteraction,
  AutocompleteInteraction,
  Client
} from 'discord.js'

import { IGuildConfig } from './guild'

export interface SlashCommand {
  command: SlashCommandBuilder | any
  execute: (interaction: CommandInteraction, client?: Client) => void
  autocomplete?: (interaction: AutocompleteInteraction) => void
  cooldown?: number
  category?: string
}

declare module 'discord.js' {
  export interface Client {
    configs: Collection<string, IGuildConfig>
    commands: Collection<string, SlashCommand>
    cooldowns: Collection<string, number>
  }
}

export interface BotEvent {
  name: string
  once?: boolean | false
  execute: (...args: any[]) => void
}
