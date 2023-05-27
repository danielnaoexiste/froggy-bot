import { SlashCommandBuilder } from 'discord.js'

import { ITarotCard, SlashCommand } from '../../types'
import { Categories } from '../../util'
import { getTarotEmbed } from '../../embeds/tarot'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('tarot')
    .setDescription('Draws a random tarot card!'),

  execute: async interaction => {
    const card: ITarotCard = (
      await fetch(`${process.env.TAROT_API}/random?n=1`).then(res => res.json())
    ).cards[0]

    const tarotEmbed = await getTarotEmbed(interaction, card)

    await interaction.reply({
      embeds: [tarotEmbed]
    })
  },
  cooldown: 10,
  category: Categories.TAROT
}

export default command
