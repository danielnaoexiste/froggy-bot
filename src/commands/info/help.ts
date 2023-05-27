import { ComponentType, SlashCommandBuilder } from 'discord.js'

import { SlashCommand } from '../../types'
import { Categories } from '../../util'

import {
  getHelpCategoryEmbed,
  getHelpComponents,
  getHelpEmbed
} from '../../embeds/info'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of all the commands.'),

  execute: async interaction => {
    const directories = [
      ...new Set(interaction.client.commands.map(cmd => cmd.category))
    ]

    const categories = directories.map(dir => {
      const getCommands = interaction.client.commands
        .filter(cmd => cmd.category === dir)
        .map(cmd => ({
          name: cmd.command.name,
          description: cmd.command.description
        }))

      return {
        directory: dir,
        commands: getCommands
      }
    })

    const helpEmbed = await getHelpEmbed(interaction)

    const initialMessage = await interaction.reply({
      embeds: [helpEmbed],
      ephemeral: true,
      //@ts-ignore
      components: getHelpComponents(categories, false)
    })

    const collector = interaction.channel!.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      time: 30000
    })

    collector.on('collect', async interaction => {
      const [directory] = interaction.values
      const category = categories.find(
        cat => cat.directory!.toLowerCase() === directory
      )

      const categoryEmbed = await getHelpCategoryEmbed(
        interaction,
        category,
        directory
      )

      interaction.update({ embeds: [categoryEmbed] })
    })

    collector.on('end', () => {
      initialMessage.edit({
        //@ts-ignore
        components: getHelpComponents(categories, true)
      })
    })
  },
  cooldown: 10,
  category: Categories.INFO
}

export default command
