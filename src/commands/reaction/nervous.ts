
import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../types'
import { getAnimeEmbed } from '../../embeds/anime'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("nervous")
    .setDescription("Is nervous!"),
      
  execute: async interaction => {
    const actionDescription = "is nervous"
     
    const gif = await fetch(`${process.env.OTAKU_GIFS}nervous`).then(res => res.json())
    const description = `<@${interaction.user.id}> ${actionDescription}!`
        
    const animeEmbed = await getAnimeEmbed(interaction, description, gif.url)
        
    interaction.reply({ embeds: [animeEmbed] })
  },
  cooldown: 10,
  category: Categories.REACTION
}

export default command