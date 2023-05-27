
import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../types'
import { getAnimeEmbed } from '../../embeds/anime'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("nuzzle")
    .setDescription("Nuzzles a target!") 
    .addUserOption(option =>
      option
      .setName('target')
      .setDescription('Interaction target')
      .setRequired(true)
    ),
    
  execute: async interaction => {
    const target = interaction.options.get('target')!.value
    const actionDescription = "nuzzles"
     
    const gif = await fetch(`${process.env.OTAKU_GIFS}nuzzle`).then(res => res.json())
    const description = `<@${interaction.user.id}> ${actionDescription} <@${target}>!`
        
    const animeEmbed = await getAnimeEmbed(interaction, description, gif.url)
        
    interaction.reply({ embeds: [animeEmbed] })
  },
  cooldown: 10,
  category: Categories.INTERACTION
}

export default command
