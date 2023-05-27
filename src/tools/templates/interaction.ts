import { IAnime } from '../../util'

export default (i: IAnime) => `
import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../../types'
import { getAnimeEmbed } from '../../embeds/anime'
import { Categories } from '../../util'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("${i.name}")
    .setDescription("${
      i.desc.charAt(0).toUpperCase() + i.desc.slice(1)
    } a target!") 
    .addUserOption(option =>
      option
      .setName('target')
      .setDescription('Interaction target')
      .setRequired(true)
    ),
    
  execute: async interaction => {
    const target = interaction.options.get('target')!.value
    const actionDescription = "${i.desc}"
     
    const gif = await fetch(\`\${process.env.OTAKU_GIFS}${
      i.name
    }\`).then(res => res.json())
    const description = \`<@\${interaction.user.id}> \${actionDescription} <@\${target}>!\`
        
    const animeEmbed = await getAnimeEmbed(interaction, description, gif.url)
        
    interaction.reply({ embeds: [animeEmbed] })
  },
  cooldown: 10,
  category: Categories.INTERACTION
}

export default command
`
