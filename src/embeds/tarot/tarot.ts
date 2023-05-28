import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'
import { ITarotCard } from '../../types'

export const getTarotEmbed = async (
  interaction: CommandInteraction<CacheType>,
  card: ITarotCard
) => {
  const dir: string[] = ['tn', 'rev']
  const randomDir = Math.floor(Math.random() * dir.length)

  const imageUrl = `${process.env.TAROT_IMAGE}/${dir[randomDir]}/${card.name_short}.jpg`
  const imageHQ = `${process.env.TAROT_IMAGE}/img/${card.name_short}.jpg`

  const botName = process.env.BOT_NAME!
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(randomDir === 0 ? Colors.DarkGreen : Colors.DarkRed)
    .setAuthor({ name: card.name, url: imageHQ, iconURL: imageHQ })
    .setDescription(randomDir === 0 ? card.meaning_up : card.meaning_rev)
    .setImage(imageUrl)
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
