
import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../types'
import { getAnimeEmbed } from '../../embeds/anime'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("confused")
    .setDescription("Is confused!"),
      
  execute: async interaction => {
    const actionDescription = "is confused"
     
    const gif = await fetch(`${process.env.OTAKU_GIFS}confused`).then(res => res.json())
    const description = `<@${interaction.user.id}> ${actionDescription}!`
        
    const animeEmbed = await getAnimeEmbed(interaction, description, gif.url)
        
    interaction.reply({ embeds: [animeEmbed] })
  },
  cooldown: 10,
  category: Categories.REACTION
}

export default command
