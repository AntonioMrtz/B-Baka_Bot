import { Message } from 'discord.js'

const Discord = require('discord.js')
const axios = require('axios')

export const queryWordDefinition = async (msg: Message) => {
  /*
      {   INPUT FROM Urban dictionary API
      "list": [
        "definition": "A [set] of man [fruits], [love] spudsbollocksgooliesknackers",
        "permalink": "http://stonks.urbanup.com/1709089",
        "thumbs_up": 14,
        "sound_urls": [],
        "author": "Rudis",
        "word": "stonks",
        "defid": 1709089,
        "current_vote": "",
        "written_on": "2006-04-20T07:16:23Z",
        "example": "he had a [set] of stonks like a fighters [speed ball]",
        "thumbs_down": 29
        ]
      } */

  let word = ''

  if (msg.content.split(' ')[0] === '!wordoftheday') {
    const resWordOfTheDay = await axios.get('https://www.urbandictionary.com/')

    const reWordOfTheDayTitle = /<title>.*<\/title>/

    const matchWordOfTheDay = reWordOfTheDayTitle.exec(resWordOfTheDay.data)

    if (matchWordOfTheDay) {
      const wordOfTheDay = matchWordOfTheDay[0]

      word = wordOfTheDay.split(':')[1].trim().replace('</title>', '')
    } else {
      throw new Error('Couldnt found the word of the day.')
    }
  } else {
    word = msg.content.split(' ').slice(1).join().trim().replaceAll(',', ' ')
  }

  const url = 'https://api.urbandictionary.com/v0/define?term=' + word

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axios.get(url).then((resWordOfTheDay: any) => {
    let maxUpvotes = -1
    let indexMapUpvotes = -1

    for (let i = 0; i < resWordOfTheDay.data.list.length; i++) {
      if (
        maxUpvotes === -1 ||
        maxUpvotes < resWordOfTheDay.data.list[i].thumbs_up
      ) {
        maxUpvotes = resWordOfTheDay.data.list[i].thumbs_up
        indexMapUpvotes = i
      }
    }

    if (maxUpvotes !== -1) {
      let definition = resWordOfTheDay.data.list[indexMapUpvotes].definition
      definition = definition.replaceAll('[', '')
      definition = definition.replaceAll(']', '')

      let example = resWordOfTheDay.data.list[indexMapUpvotes].example
      example = example.replaceAll('[', '')
      example = example.replaceAll(']', '')

      const url = resWordOfTheDay.data.list[indexMapUpvotes].permalink

      const urbanDictionaryEmbeded = new Discord.MessageEmbed()
        .setTitle('Definition of ' + word)
        .setThumbnail(
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png'
        )
        .setColor('DARK_BLUE')
        .addField('\u200B', definition)
        .addField('\u200B', 'Example/s: ')
        .addField('\u200B', example)
        .addField('\u200B', '\u200B')
        .setFooter({
          text: 'Urban Dictionary API',
          iconURL:
            'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png'
        })
        .setTimestamp()
        .setURL(url)

      msg.reply({ embeds: [urbanDictionaryEmbeded] })
    } else {
      const urbanDictionaryEmbeded = new Discord.MessageEmbed()
        .setTitle('*Definition not found*')
        .setThumbnail(
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png'
        )
        .setColor('DARK_RED')
        .setFooter({
          text: 'Urban Dictionary API',
          iconURL:
            'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ud_logo.png'
        })
        .setTimestamp()

      msg.reply({ embeds: [urbanDictionaryEmbeded] })
    }
  })
}
