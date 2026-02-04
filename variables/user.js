export const userVariables = {
  userProfile: {
    ID: "",
    MC: 0,
    MUID: -1,
    acceptedRules: false,
    testerMode: false,
    onSlowmode: false,
    isBanned: false,
    devMode: 0,
    hadAnn: false,
    rtMode: 0,
    language: 0,
    timezone: "Etc/UTC",

    limiters: {},

    challenge: {
      settings: [],
      difficulty: 1
    },

    userPacks: [],
  },

  userPlayData: {
    MessageID: "",
    ChannelID: "",
    GuildID: "",
    started: false,
    isDead: false,
    tier: 1,
    MC: 0,
    XP: 0,
    currentBiome: -1,
    currentAnimal: "",
    apex: [],

    arena: {
      turn: 0,
      bites: 0,
      opponentBites: 0,
      opponentAnimal: "",
      opponentWardrobe: -1,
      opponentXP: -1,
      opponentAction: -1,
      opponentTier: -1,
    },
  },

  userWardrobe: {},
  challengeHistory: [],

  caughtRaresInRaretryrun: 0,
  caughtRaresInRaretry: 0,
  dailyStreak: 0,
  userReminders: [],
}