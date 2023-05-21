import { IAnime } from '../../util'

export default (i: IAnime) => `
import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../types'
import { getAnimeEmbed } from '../../embeds/anime'

const endpoint = 'https://api.otakugifs.xyz/gif?format=gif&reaction='

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("${i.name}")
    .setDescription("${i.desc.charAt(0).toUpperCase() + i.desc.slice(1)}!"),
      
  execute: async interaction => {
    const actionDescription = "${i.desc}"
     
    const gif = await fetch(\`\${endpoint}${i.name}\`).then(res => res.json())
    const description = \`<@\${interaction.user.id}> \${actionDescription}!\`
        
    const animeEmbed = await getAnimeEmbed(interaction, description, gif.url)
        
    interaction.reply({ embeds: [animeEmbed] })
  },
  cooldown: 10
}

export default command
`
