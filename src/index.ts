import { queryOpgg, querySummonerName } from './modules/opgg/index'
import { queryWordDefinition } from './modules/urbanDictionary'
import Discord, { Message } from 'discord.js'

import { MongoClient } from 'mongodb'
import path from 'path'

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

if (process.env.CLUSTER === undefined) {
  console.error('Connection string for Database doesnt exist')
  process.exit()
}

const clientDB = new MongoClient(process.env.CLUSTER)
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const database = clientDB.db('B-BakaBot')

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
})

// ?--------------

client.on('ready', () => {
  if (client.user) {
    client.user.setActivity('!help', { type: 'COMPETING' })
  }
  console.log('🟪🟪B-Baka Bot started!🟪🟪')
})

client.on('messageCreate', (msg: Message) => {
  //* FORMATO = https://euw.op.gg/champions/jhin/top/build

  if (msg.content === '!bloodtrail') {
    msg.reply({
      files: [
        {
          attachment:
            'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/bloodtrail.png'
        }
      ]
    })
  } else if (msg.content.startsWith('!runes')) {
    queryOpgg(msg)
  } else if (msg.content.startsWith('!opgg')) {
    const command = msg.content.split(' ')
    let profileUrl = 'https://euw.op.gg/summoners/euw/'

    if (command.length === 1) {
      msg.reply('Invalid name')
    }

    for (let i = 1; i < command.length; i++) {
      profileUrl += command[i]
    }

    querySummonerName(msg, profileUrl, command)
  } else if (msg.content === '!help') {
    const helpEmbeded = new Discord.MessageEmbed()
      .setTitle(' * COMMANDS *')
      .setThumbnail(
        'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/help_logo.png'
      )
      .setColor('GREEN')
      .addField('\u200B', '\u200B')
      .addField('!opgg [Summoner Name] ', '\u200B')
      .addField('!runes [champion_name] [role] ', '\u200B')
      .addField('!definition [word or phrase] ', '\u200B')
      .addField('!wordoftheday ', '\u200B')
      .addField('!coinflip ', '\u200B')
      .addField('!bloodtrail ', '\u200B')
      .addField('!bye ', '\u200B')
      .addField('\u200B', '\u200B')
      .setFooter({
        text: 'B-Baka Bot by AntonioMrtz',
        iconURL:
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/baka_bot_profile_img.jpg'
      })

    msg.reply({ embeds: [helpEmbeded] })
  } else if (msg.content === '!coinflip') {
    let coinflip

    if (Math.random() > 0.49) {
      coinflip = new Discord.MessageEmbed()
        .setTitle('Coinflip -> CARA')
        .setColor('AQUA')
        .setImage(
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/ct_logo.png'
        )
        .addField('\u200B', '\u200B')
    } else {
      coinflip = new Discord.MessageEmbed()
        .setTitle('Coinflip -> CRUZ')
        .setColor('RED')
        .setImage(
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/t_logo.png'
        )
        .addField('\u200B', '\u200B')
    }

    msg.reply({ embeds: [coinflip] })
  } else if (msg.content === '!p') {
    //! { TEST ONLY }
    console.log('PRUEBA')
  } else if (msg.content.startsWith('!definition')) {
    queryWordDefinition(msg)
  } else if (msg.content === '!wordoftheday') {
    queryWordDefinition(msg)
  } else if (msg.content === '!bye') {
    msg.reply('Bye Bye 👋👋')
    console.log('B-Baka Bot stopped! :(')
    process.exit()
  }
})

function run () {
  client.login(process.env.TOKEN)
}

run()
