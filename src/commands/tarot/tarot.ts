import { SlashCommandBuilder } from 'discord.js'

import { ITarotCard, SlashCommand } from '../../types'
import { Categories, TarotCards } from '../../util'
import { getTarotEmbed } from '../../embeds/tarot'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('tarot')
    .setDescription('Draws a random tarot card!'),

  execute: async interaction => {
    await interaction.deferReply()

    const cards = TarotCards as ITarotCard[]

    const randomCard = Math.floor(Math.random() * cards.length)
    const selectedCard = cards[randomCard]

    const tarotEmbed = await getTarotEmbed(interaction, selectedCard)

    await interaction.editReply({
      embeds: [tarotEmbed]
    })
  },
  cooldown: 10,
  category: Categories.TAROT
}

export default command
