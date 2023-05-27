import { CacheType, Colors, CommandInteraction, EmbedBuilder } from 'discord.js'
import { ITarotCard } from '../../types'

export const getTarotEmbed = async (
  interaction: CommandInteraction<CacheType>,
  card: ITarotCard
) => {
  const dir: string[] = ['tn', 'rev']
  const rand_dir = Math.floor(Math.random() * dir.length)

  const image_url = `${process.env.TAROT_IMAGE}/${dir[rand_dir]}/${card.name_short}.jpg`
  const image_hq = `${process.env.TAROT_IMAGE}/img/${card.name_short}.jpg`

  const botName = process.env.BOT_NAME!
  const botIcon = interaction.client.user!.displayAvatarURL()

  return new EmbedBuilder()
    .setColor(rand_dir === 0 ? Colors.DarkGreen : Colors.DarkRed)
    .setAuthor({ name: card.name, url: image_hq, iconURL: image_hq })
    .setDescription(rand_dir === 0 ? card.meaning_up : card.meaning_rev)
    .setImage(image_url)
    .setFooter({
      text: botName,
      iconURL: botIcon
    })
    .setTimestamp()
}
