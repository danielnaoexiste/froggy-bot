
import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../types'
import { getAnimeEmbed } from '../../embeds/anime'

const endpoint = 'https://api.otakugifs.xyz/gif?format=gif&reaction='

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("shy")
    .setDescription("Shies away!"),
      
  execute: async interaction => {
    const actionDescription = "shies away"
     
    const gif = await fetch(`${endpoint}shy`).then(res => res.json())
    const description = `<@${interaction.user.id}> ${actionDescription}!`
        
    const animeEmbed = await getAnimeEmbed(interaction, description, gif.url)
        
    interaction.reply({ embeds: [animeEmbed] })
  },
  cooldown: 10
}

export default command
