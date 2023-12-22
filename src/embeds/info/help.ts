import {
  ActionRowBuilder,
  CacheType,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuInteraction
} from 'discord.js'
import { Emojis } from '../../util'

type TEmojis =
  | 'Moderation'
  | 'Configuration'
  | 'Information'
  | 'Interaction'
  | 'Reaction'

export const getHelpEmbed = async (
  interaction: CommandInteraction<CacheType>
) => {
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(Colors.Green)
    .setDescription('Please choose a category!')
    .setFooter({
      text: process.env.BOT_NAME!,
      iconURL: botIcon
    })
    .setTimestamp()
}

export const getHelpCategoryEmbed = async (
  interaction: StringSelectMenuInteraction<CacheType>,
  category: any,
  directory: string
) => {
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(Colors.DarkGreen)
    .setDescription(`A list of all ${directory} commands`)
    .addFields(
      category.commands.map((cmd: any) => ({
        name: `\`${cmd.name}\``,
        value: cmd.description,
        inline: true
      }))
    )
    .setFooter({
      text: process.env.BOT_NAME!,
      iconURL: botIcon
    })
    .setTimestamp()
}

export const getHelpComponents = (categories: any, state: boolean) => [
  new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('help-menu')
      .setPlaceholder('Category')
      .setDisabled(state)
      .addOptions(
        categories.map((cmd: any) => ({
          label: cmd.directory,
          value: cmd.directory?.toLowerCase(),
          description: `Commands from ${cmd.directory} category.`,
          emoji: Emojis[cmd.directory as TEmojis]
        }))
      )
  )
]
