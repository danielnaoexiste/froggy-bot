import {
  Collection,
  SlashCommandBuilder,
  CommandInteraction,
  AutocompleteInteraction
} from 'discord.js'

export interface SlashCommand {
  command: SlashCommandBuilder | any
  execute: (interaction: CommandInteraction) => void
  autocomplete?: (interaction: AutocompleteInteraction) => void
  cooldown?: number
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, SlashCommand>
    cooldowns: Collection<string, number>
  }
}

export interface BotEvent {
  name: string
  once?: boolean | false
  //@ts-ignore
  execute: (...args) => void
}
