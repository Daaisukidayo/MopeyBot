export const challengeVariables = {
  difficulties: ["0", "1", "2", "3"],
  lobbyModes: ["0", "1", "2"],
  playTypes: ["0", "1"],

  defaultDifficulty: "1",

  baseChallengeProgress: {
    started: true,
    paused: false,
    points: 0,
    rares: 0,
    userID: -1,
    teamID: -1,
    difficulty: -1,
    list: {},
    events: []
  },

  allSettings: {
    hidePoints: 0,
    hideRares: 1,
    hideLimit: 2,
    hidePrediction: 3,
  },

  chartLimits: {
    0: [
      {
        category: -1,
        limit: -1
      }
    ],

    1: [
      {
        category: 0,
        limit: 3
      }
    ],

    2: [
      {
        category: 0,
        limit: 3
      },
      {
        category: 1,
        limit: 2
      }
    ],

    3: [
      {
        category: 0,
        limit: 3
      },
      {
        category: 1,
        limit: 2
      },
      {
        category: 2,
        limit: 1
      }
    ],
  },

  
  challengeData: [
    {
      category: 0,
      rares: [ "chocoToucan", "keelBilledToucan", "markhor", "yellowPufferfish" ],
      points: 1,
    },
    {
      category: 1,
      rares: [ "doe", "blueMacaw", "jaguar", "leopard", "fieryToucan", "lionCub", "lioness" ],
      points: 2,
    },
    {
      category: 2,
      rares: [ "whiteDove", "pinkyPig", "marshDeer", "goldenPheasant", "momaffie", "momaffieFamily", "blackPanther", "whiteTiger", "blackManedLion" ],
      points: 3,
    },
    {
      category: 3,
      rares: [ "jackass", "whiteLion", "whiteLioness", "whiteLionCub", "bigGoat" ],
      points: 5,
    },
    {
      category: 4,
      rares: [ "girabie", "stinkyPig", "muskDeer", "predator", "goldenEagle" ],
      points: 10,
    },
    {
      category: 5,
      rares: [ "blackLion", "blackLioness", "blackLionCub", "whiteRhino", "aquaYeti" ],
      points: 15,
    },
    {
      category: 6,
      rares: [ "lavaToucan",  "demonPufferfish",  "blackRhino",  "whiteGiraffe",  "giraffeFamily" ],
      points: 25,
    },
    {
      category: 7,
      rares: [ "rareMacaw", "rareToucan", "rareVulture", "shaheen", "harpyEagle", "greaterSpottedEagle", "rareBigfoot",  "rareSnowman",  "rareSnowgirl",  "rareKingDragon" ],
      points: 75,
    },
  ],
  
  allRaresData: {
    whiteDove: ["wd", "whitedove"],
    pinkyPig: ["pp", "pinkypig"],
    stinkyPig: ["sp", "stinkypig"],
    doe: ["doe"],
    marshDeer: ["mad", "marshdeer"],
    muskDeer: ["mud", "muskdeer"],
    goldenPheasant: ["gph", "goldenpheasant"],
    blueMacaw: ["bm", "bluemacaw"],
    rareMacaw: ["sm", "spixmacaw"],
    jackass: ["jac", "jack", "jackass"],
    momaffie: ["mom", "momaffie"],
    momaffieFamily: ["mf", "momaffiefamily"],
    girabie: ["gir", "girabie"],
    jaguar: ["jag", "jaguar"],
    leopard: ["leo", "leopard"],
    blackPanther: ["bp", "blackpanther"],
    chocoToucan: ["cht", "choco", "chocotoucan"],
    keelBilledToucan: ["kbt", "keelbilled", "keelbilledtoucan"],
    fieryToucan: ["ft", "fiery", "fierytoucan"],
    lavaToucan: ["lt", "lava", "lavatoucan"],
    rareToucan: ["hht", "helmetedhornbill", "helmetedhornbilltoucan"],
    yellowPufferfish: ["yp", "yellowpufferfish"],
    demonPufferfish: ["dp", "df", "demonfish", "demonpufferfish"],
    whiteTiger: ["wt", "whitetiger"],
    lionCub: ["lc", "lioncub"],
    whiteLionCub: ["wlc", "whitelioncub"],
    blackLionCub: ["blc", "blacklioncub"],
    lioness: ["ln", "lioness"],
    whiteLioness: ["wln", "whitelioness"],
    blackLioness: ["bln", "blacklioness"],
    blackManedLion: ["bml", "blackmanedlion"],
    whiteLion: ["wl", "whitelion"],
    blackLion: ["bl", "blacklion"],
    rareVulture: ["arg", "argentavis"],
    predator: ["pf", "pre", "predator"],
    shaheen: ["sf", "sha", "shaheen"],
    whiteRhino: ["wr", "whiterhino"],
    blackRhino: ["br", "blackrhino"],
    goldenEagle: ["ge", "goldeneagle"],
    harpyEagle: ["har", "harpyeagle"],
    greaterSpottedEagle: ["gse", "greaterspottedeagle"],
    markhor: ["mar", "markhor"],
    bigGoat: ["bg", "biggoat"],
    whiteGiraffe: ["wg", "whitegiraffe"],
    giraffeFamily: ["gf", "wgf", "giraffefamily"],
    aquaYeti: ["ay", "aq", "aquayeti"],
    shopSnowman: ["ssm", "shopsnowman"],
    shopBigfoot: ["sbf", "shopbigfoot"],
    shopSnowgirl: ["ssg", "shopsnowgirl"],
    rareSnowman: ["rsm", "raresnowman"],
    rareBigfoot: ["rbf", "rarebigfoot"],
    rareSnowgirl: ["rsg", "raresnowgirl"],
    rareKingDragon: ["rkd", "rarekingdragon"]
  },


  eventChartLimits: [
    {
      category: 0,
      limit: 5
    },
    {
      category: 1,
      limit: 3
    }
  ],

  eventChallengeData: [
    {
      category: 0,
      rares: [ "chocoToucan", "keelBilledToucan", "markhor", "yellowPufferfish" ],
      points: 1,
    },
    {
      category: 1,
      rares: [ "doe", "blueMacaw", "jaguar", "leopard", "fieryToucan", "lionCub", "lioness" ],
      points: 2,
    },
    {
      category: 2,
      rares: [ "whiteDove", "pinkyPig", "marshDeer", "goldenPheasant", "momaffie", "momaffieFamily", "blackPanther", "whiteTiger", "blackManedLion" ],
      points: 3,
    },
    {
      category: "rare",
      rares: [ "predator", "whiteLion", "whiteLioness", "whiteLionCub", "bigGoat" ],
      points: 5,
    },
    {
      category: "epic",
      rares: [ "girabie", "stinkyPig", "muskDeer", "jackass", "goldenEagle" ],
      points: 8,
    },
    {
      category: "legendary",
      rares: [ "blackLion", "blackLioness", "blackLionCub", "whiteRhino", "aquaYeti" ],
      points: 12,
    },
    {
      category: "mythic",
      rares: [ "lavaToucan",  "demonPufferfish",  "blackRhino",  "whiteGiraffe",  "giraffeFamily" ],
      points: 20,
    },
    {
      category: "godlike",
      rares: [ "rareBigfoot",  "rareSnowman",  "rareSnowgirl",  "rareKingDragon" ],
      points: 40,
    },
    {
      category: "divine",
      rares: [ "rareMacaw", "rareToucan", "rareVulture", "shaheen", "harpyEagle", "greaterSpottedEagle" ],
      points: 75,
    },
  ],
}