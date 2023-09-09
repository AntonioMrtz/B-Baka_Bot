import { Message } from 'discord.js'
import { ChampionData } from './ChampionData'

const Discord = require('discord.js')
const axios = require('axios')

const championsDataSingleton = new ChampionData()

const lolChampionsRoles = {
  roles: ['supp', 'support', 'adc', 'mid', 'jgl', 'jungle', 'jg', 'top']
}

export const queryOpgg = async (msg: Message) => {
  let flagTwoWordsChamp = 0
  let voidChamp = 0

  const command = msg.content.split(' ')

  let url = 'https://euw.op.gg/champions/'

  let champion
  let role: string

  let championUpperCaseFirst = ''

  if (command.length === 2) {
    msg.reply('```Champion or Role not found```')
    return
  } else if (command.length === 4) {
    // 2 word champs

    flagTwoWordsChamp = 1
    champion = command[1].toLocaleLowerCase() + command[2].toLocaleLowerCase()
    role = command[3].toLocaleLowerCase()
  } else if (command[1].search("'") !== -1) {
    // has '

    voidChamp = 1
    champion = command[1].toLocaleLowerCase()
    role = command[2].toLocaleLowerCase()
  } else {
    // single word
    champion = command[1].toLocaleLowerCase()
    role = command[2].toLocaleLowerCase()
  }

  champion = champion.trim()
  role = role.trim()

  if (champion.search("'") !== -1) {
    champion = champion.replace("'", '')
  }

  if (voidChamp === 1) {
    championUpperCaseFirst = champion[0].toUpperCase() + champion.slice(1)
    championUpperCaseFirst = championUpperCaseFirst.replace("'", '')
  } else if (flagTwoWordsChamp === 0) {
    championUpperCaseFirst = champion[0].toUpperCase() + champion.slice(1)
  } else {
    championUpperCaseFirst =
      command[1][0].toUpperCase() +
      command[1].slice(1) +
      command[2][0].toUpperCase() +
      command[2].slice(1)
  }

  const championsData = await championsDataSingleton.getChampionsData()

  if (
    championsData &&
    lolChampionsRoles.roles.includes(role) &&
    championsData.data[championUpperCaseFirst]
  ) {
    // check if the rol and champion exists

    if (role === 'supp') {
      role = 'support'
    } else if (role === 'jg' || role === 'jgl') {
      role = 'jungle'
    }

    url += champion + '/' + role + '/' + 'build'

    fetch(
      'https://ddragon.leagueoflegends.com/cdn/13.3.1/data/en_US/champion/' +
        championUpperCaseFirst +
        '.json'
    )
      .then((resChampionInfo) => resChampionInfo.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((resChampionInfoJson: any) => {
        const skins = resChampionInfoJson.data[championUpperCaseFirst].skins

        const runesEmbeded = new Discord.MessageEmbed()
          .setTitle('Runas ' + championUpperCaseFirst + ' en ' + role)
          .setColor('FUCHSIA')
          .setThumbnail(
            'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/' +
              championUpperCaseFirst +
              '_' +
              Math.floor(Math.random() * (skins.length - 1)) +
              '.jpg'
          )
          .addField('\u200B', url)
          .addField('\u200B', '\u200B')
          .setFooter({
            text: 'Op.GG',
            iconURL:
              'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png'
          })
          .setTimestamp()
          .setURL(url)

        msg.reply({ embeds: [runesEmbeded] })
      })
  } else {
    msg.reply('```Champion or Role not found```')
  }
}

export const querySummonerName = (
  msg: Message,
  profileUrl: string,
  command: string[]
) => {
  // antes
  // </div><img src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon4884.jpg?image=q_auto&amp;image=q_auto,f_png,w_auto&amp;v=1650634188962" alt="profile image"

  // ahora
  // <div class="profile-icon"><img src="https://opgg-static.akamaized.net/images/profile_icons/profileIcon743.jpg?image=q_auto&amp;image=q_auto,f_webp,w_auto&amp;v=1656664295380" alt="profile image"><div><span class="level">284</span></div></div>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axios.get(profileUrl).then((res: any) => {
    let profileImage = ''

    const reProfileImage = /<div class="profile-icon.*alt="profile image"/ // TODO devolver

    const resultReProfileImage = reProfileImage.exec(res.data)

    if (resultReProfileImage == null) {
      const profileEmbeded = new Discord.MessageEmbed()
        .setTitle('*Summoner not Found*')
        .setThumbnail(
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png'
        )
        .addField('\u200B', '\u200B')
        .setColor('DARK_RED')
        .setFooter({
          text: 'Op.GG',
          iconURL:
            'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png'
        })
        .setTimestamp()

      msg.reply({ embeds: [profileEmbeded] })
      return
    }

    const resultValidReProfileImage = resultReProfileImage[0]
    profileImage = resultValidReProfileImage.split('alt')[0]

    const reProfileImageLink = /src=".*?"/
    const match = reProfileImageLink.exec(profileImage)

    if (match !== null) {
      profileImage = match[0].replace('src=', '').replace(/"/g, '')
    } else {
      throw new Error('Profile image link not found.')
    }

    const profileEmbeded = new Discord.MessageEmbed()
      .setTitle('Perfil de ' + command[1])
      .setColor('DARK_AQUA')
      .setThumbnail(profileImage)
      .setFooter({
        text: 'Op.GG',
        iconURL:
          'https://raw.githubusercontent.com/AntonioMrtz/B-Baka_Bot/main/img/opgg_logo.png'
      })
      .setTimestamp()
      .setURL(profileUrl)

    msg.reply({ embeds: [profileEmbeded] })
  })
}
