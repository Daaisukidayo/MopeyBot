export default {
  // general
  botEnabled: true,
  makeBackups: false,
  sendReminders: false,

  // colors
  defaultColor: "#FFD700",
  errorColor: "#D0321D",
  luckyColor: "#96BD11",
  // luckyColor: "#228B22",
  cooldownColor: "#7303b7",
  logColor: "#2019b3",
  apexEmbedColor: "#000000",
  rareKingDragonColor: "#d61b4a",

  // emojis
  emoji: "<:MopeCoin:1279092125459288124>",
  blank: "<:blank:1337851779253272759>",
  filter: "<:filter:1486794473940979994>",

  // IDs
  reportChannelID: "1372645851159330947",
  logChannelID: "1391387203871047731",

  // limits
  maxParticipants: 10,
  maxCoinflipBet: 200000,
  maxSlotsBet: 50000,
  defaultSlotsBet: 5,
  maxRaretryrunRares: 20,
  maxRaretryRares: 3,

  // rewards
  voteReward: 10000,
  dailyReward: 20000,
  weeklyReward: 150000,
  checklistReward: 30000,
  
  // links
  leaderboardThumbnail: 'https://cdn.discordapp.com/attachments/701793335941136464/1326901475464450100/Remove-bg.ai_1736428344912.png',
  discordServerInvite: "https://discord.gg/FE4dqGD",
  informationLink: "https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md",
  tosLink: "https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md",
  rulesLink: "https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md",

  // other
  allReminders: ["0", "1"],
  NS: '∙', //! number separator

  allLocales: [
    {
      name: "EN",
      description: "English"
    },
    {
      name: "RU",
      description: "Русский"
    }
  ],

  endingsMap: {
    'e': ['о', 'а', 'ов'],
    'i': ['а', 'и', ''],
    'm': ['', 'а', 'ов'],
    'y': ['я', 'и', 'ей'],
    're': ['ое', 'их', 'их'],
  }
}