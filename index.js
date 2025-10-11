// ========== ENVIRONMENT CONFIGURATION ==========
// Load environment variables before anything else

import dotenv from "dotenv"
dotenv.config()

// ========== IMPORTS ==========
// Bring in the essentials for our bot’s operations

import { ForgeTopGG } from "@tryforge/forge.topgg"
import { ForgeClient, LogPriority } from "@tryforge/forgescript"
import { ForgeDB } from "@tryforge/forge.db"
import { ForgeCanvas } from "@tryforge/forge.canvas"
import shutdownSetup from "./src/scripts/shutdownSetup.js"

// ========== CLIENT CONFIGURATION ==========
// Initialize the bot client with extensions, intents, and events

const TOP = new ForgeTopGG({
  token: process.env.TOPTOKEN,
  auth: process.env.TOPAUTH,
  events: [
    "error",
    "posted",
    "voted"
  ],
  port: 9030,
  post: {
    interval: 3_600_000
  }
})

const DB = new ForgeDB({
  events: ["connect"],
});

const FC = new ForgeCanvas();

const BOT = new ForgeClient({
  mobile: true,
  extensions: [
    DB,
    FC,
    TOP
  ],
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    "DirectMessageReactions",
    "MessageContent",
  ],
  events: ["interactionCreate", "messageCreate", "clientReady"],
  prefixes: ["$default[$getGuildVar[prefix];$getGlobalVar[prefix]]"],
  logLevel: LogPriority.VeryLow,
});

// ========== LOAD COMMANDS ==========
BOT.commands.load("./src/commands");
BOT.functions.load("./src/functions");
TOP.commands.load("./src/topgg");

// ========== SIGNALS handler ==========

shutdownSetup(BOT)

// ========== LOGIN ==========
BOT.login(process.env.TOKEN);

// ========== DB CONNECT EVENT ==========
// Executes when the DB is ready

DB.commands.add({
  type: "connect",
  code: `
    $logger[Info;Connected to the database]
  `,
});

// ========== VARIABLES ==========

DB.variables({
  // User variables
  
  userProfile: {
    ID: "",
    MC: 0,
    MUID: -1,
    acceptedRules: false,
    testerMode: false,
    onSlowmode: false,
    isBanned: false,
    devMode: false,
    hadAnn: false,
    rtMode: "default",
    language: "EN",
    timezone: "Etc/UTC",

    limiters: {},

    "1hl": {
      history: [],
      settings: [],
      difficulty: "normal"
    },

    userPacks: [],
  },

  userPlayData: {
    started: false,
    isDead: false,
    tier: 0,
    MC: 0,
    XP: 0,
    color: "",
    currentBiome: "",
    currentAnimal: "",
    animalBiome: "",
    bitesInArena: 0,
    arenaTurn: 0,
    opponentBitesInArena: 0,
    opponentAnimal: "",
    opponentAction: "",
    opponentTier: "",
    opponentApex: "",
    MessageID: "",
    ChannelID: "",
    GuildID: "",

    apex: [], // expected: array with names inside
  },

  userWardrobe: {
    mouse: 0,
    desertRat: 0,
    shrimp: 0,
    arcticChipmunk: 0,
    tarsier: 0,
    rabbit: 0,
    pigeon: 0,
    whiteDove: 0,
    desertChipmunk: 0,
    trout: 0,
    arcticHare: 0,
    chukar: 0,
    mole: 0,
    chicken: 0,
    meerkat: 0,
    crab: 0,
    penguin: 0,
    flyingLizard: 0,
    pig: 0,
    pinkyPig: 0,
    stinkyPig: 0,
    woodpecker: 0,
    armadillo: 0,
    seaHorse: 0,
    seal: 0,
    kakapo: 0,
    deer: 0,
    doe: 0,
    marshDeer: 0,
    gazelle: 0,
    squid: 0,
    flamingo: 0,
    reindeer: 0,
    muskDeer: 0,
    swinehoe: 0,
    goldenPheasant: 0,
    fox: 0,
    hedgehog: 0,
    peacock: 0,
    fennecFox: 0,
    jellyfish: 0,
    arcticFox: 0,
    zebra: 0,
    donkey: 0,
    jackass: 0,
    macaw: 0,
    blueMacaw: 0,
    rareMacaw: 0,
    warthog: 0,
    turtle: 0,
    muskox: 0,
    cobra: 0,
    giraffe: 0,
    momaffie: 0,
    momaffieFamily: 0,
    girabie: 0,
    camel: 0,
    stingray: 0,
    snowyOwl: 0,
    walrus: 0,
    raven: 0,
    cheetah: 0,
    jaguar: 0,
    leopard: 0,
    blackPanther: 0,
    gorilla: 0,
    toucan: 0,
    chocoToucan: 0,
    keelBilledToucan: 0,
    fieryToucan: 0,
    lavaToucan: 0,
    rareToucan: 0,
    rattleSnake: 0,
    pufferfish: 0,
    yellowPufferfish: 0,
    demonPufferfish: 0,
    snowLeopard: 0,
    turkey: 0,
    bear: 0,
    blackBear: 0,
    tiger: 0,
    whiteTiger: 0,
    blackTiger: 0,
    gobiBear: 0,
    hyena: 0,
    pelican: 0,
    swordfish: 0,
    wolf: 0,
    crocodile: 0,
    lion: 0,
    blackManedLion: 0,
    whiteLion: 0,
    blackLion: 0,
    lioness: 0,
    whiteLioness: 0,
    blackLioness: 0,
    lionCub: 0,
    whiteLionCub: 0,
    blackLionCub: 0,
    falcon: 0,
    predator: 0,
    shaheen: 0,
    vulture: 0,
    rareVulture: 0,
    octopus: 0,
    polarBear: 0,
    rhino: 0,
    whiteRhino: 0,
    blackRhino: 0,
    baldEagle: 0,
    goldenEagle: 0,
    harpyEagle: 0,
    greaterSpottedEagle: 0,
    bison: 0,
    shark: 0,
    markhor: 0,
    bigGoat: 0,
    wolverine: 0,
    hippo: 0,
    boaConstrictor: 0,
    ostrich: 0,
    komodoDragon: 0,
    killerWhale: 0,
    sabertoothTiger: 0,
    whiteGiraffe: 0,
    giraffeFamily: 0,
    elephant: 0,
    cassowary: 0,
    giantSpider: 0,
    blackwidowSpider: 0,
    blueWhale: 0,
    mammoth: 0,
    dragon: 0,
    trex: 0,
    phoenix: 0,
    pterodactyl: 0,
    kraken: 0,
    kingCrab: 0,
    yeti: 0,
    aquaYeti: 0,
    shopSnowman: 0,
    shopSnowgirl: 0,
    shopBigfoot: 0,
    rareSnowman: 0,
    rareSnowgirl: 0,
    rareBigfoot: 0,
    dinoMonster: 0,
    landMonster: 0,
    giantScorpion: 0,
    seaMonster: 0,
    iceMonster: 0,
    blackDragon: 0,
    kingDragon: 0,
    rareKingDragon: 0,
  },

  userBackup: {},

  // Guild variables

  prefix: "m!",

  // special

  allUserIDs: [],
  allTesterIDs: [],

  maxID: 0,
  backupLogCount: 0,

  // config

  botEnabled: true,
  makeBackups: false,
  defaultColor: "#FFD700",
  errorColor: "#D0321D",
  luckyColor: "#228B22",
  cooldownColor: "#7303b7",
  logColor: "#2019b3",
  apexEmbedColor: "#000000",
  kingDragonByLuckColor: "#d61b4a",
  emoji: "<:MopeCoin:705856410940080232>",
  blank: "<:blank:898514292926713866>",
  author: "$author[$username • MUID: $env[userProfile;MUID];$userAvatar]",
  reportChannelID: "1372645851159330947",
  logChannelID: "1391387203871047731",
  lobbyInactiveTime: "30m",
  maxRowsInRaresList: 6,
  maxParticipants: 10,
  maxCoinflipBet: 200000,
  maxSlotsBet: 50000,

  // history

  sortingOptions: ['points', 'rares', 'date'],

  // play

  biomeColors: {
    Land: "#00ff3c",
    Desert: "#ffcc00",
    Volcano: "#ff0000",
    Ocean: "#3498db",
    Arctic: "#ffffff",
    Forest: "#006400",
  },

  darkApexEmojis: {
    dragon: '<:DragonS1Dark:1327711395860451461>',
    trex: '<:TRexS1Dark:1327711207414566962>',
    phoenix: '<:PhoenixS1Dark:1327711260560851134>',
    pterodactyl: '<:PteroS1Dark:1327711247055065098>',
    kraken: '<:KrakenS1Dark:1327711355024703540>',
    kingCrab: '<:KingCrabS1Dark:1327711368316583976>',
    yeti: '<:YetiS1Dark:1327711197025407088>',
    landMonster: '<:LandS1Dark:1327711335944945735>',
    dinoMonster: '<:DinoS1Dark:1327711412411170876>',
    giantScorpion: '<:ScorpS1Dark:1327711231737466981>',
    seaMonster: '<:SeaS1Dark:1327711219318001674>',
    iceMonster: '<:IceS1Dark:1327711379964297316>',
    blackDragon: '<:BDragS1Dark:1327711428324364461>',
  },

  buttonStyle: [
    ["Success", ["demonPufferfish","rareToucan","rareMacaw","rareVulture","blackLion","blackLioness","blackLionCub","blackRhino","harpyEagle","greaterSpottedEagle","shaheen","rareSnowman","rareSnowgirl","rareBigfoot","rareKingDragon"]],
    ["Danger", ["marshDeer","stinkyPig","muskDeer","jackass","girabie","blackPanther","lavaToucan","whiteGiraffe","giraffeFamily","aquaYeti","bigGoat","predator","goldenEagle","whiteRhino","whiteLion","whiteLioness","whiteLionCub","whiteTiger","blackTiger","blackBear"]],
    ["Primary", ["whiteDove","doe","pinkyPig","goldenPheasant","blueMacaw","momaffie","momaffieFamily","chocoToucan","keelBilledToucan","fieryToucan","jaguar","yellowPufferfish","blackManedLion","lioness","lionCub","markhor","blackBear"]],
  ],

  // lobby

  allLobbyTagsContent: {
    unlimitedRares: "Unlimited Rares",
    normalDifficulty: "Normal Difficulty",
    mediumDifficulty: "Medium Difficulty",
    hardDifficulty: "Hard Difficulty",
  },

  difficulties: ["normal", "medium", "hard"],
  modes: ["FFA", "2 Teams", "3 Teams"],
  tags: ["unlimitedRares"],

  // raretry

  raretryVarData: {
    coinsForRaretry: [0, 0, 500, 1500, 4000, 10500, 55000, 165000, 275000, 550000, 1375000, 2750000, 5500000],
    chancesForRaretry: [3, 5, 10, 30, 75, 200, 1000, 3000, 5000, 10000, 25000, 50000, 100000],

    categories: [
      "Common",
      "Uncommon",
      "Rare",
      "Epic",
      "Legendary",
      "Extreme",
      "Mythic",
      "Godly",
      "Ultra",
    ],
    raretryModes: [
      "Default",
      "Medium",
      "Hard",
      "Insane",
      "Impossible",
    ],

    multipliersForRaretry: [1, 1.25, 1.5, 1.75, 2],
  },

  // shop

  shopItems: [
    {
      name: "Legacy Skinpack",
      code: "legacySP",
      cost: "200000",
    },
    {
      name: "Locked Skinpack",
      code: "lockedSP",
      cost: "14229000",
    },
    {
      name: "Golden Skinpack",
      code: "goldenSP",
      cost: "10820000",
    },
    {
      name: "Storefront Skinpack",
      code: "storefrontSP",
      cost: "1177000",
    },
    {
      name: "Summer Skinpack 2021",
      code: "summer2021SP",
      cost: "2359000",
    },
    {
      name: "Summer Skinpack 2022",
      code: "summer2022SP",
      cost: "485000",
    },
    {
      name: "Halloween Skinpack 2020",
      code: "halloween2020SP",
      cost: "2105000",
    },
    {
      name: "Halloween Skinpack 2021",
      code: "halloween2021SP",
      cost: "2545000",
    },
    {
      name: "Halloween Skinpack 2022",
      code: "halloween2022SP",
      cost: "1770000",
    },
    {
      name: "Halloween Skinpack 2023",
      code: "halloween2023SP",
      cost: "1570000",
    },
    {
      name: "May Skinpack 2022",
      code: "may2022SP",
      cost: "749000",
    },
    {
      name: "Christmas Skinpack 2022",
      code: "christmas2022SP",
      cost: "300000",
    },
    {
      name: "Valentine Skinpack 2023",
      code: "valentine2023SP",
      cost: "1600000",
    },
    {
      name: "Land Gold Trim Skinpack",
      code: "landGTSP",
      cost: "250000",
    },
    {
      name: "Desert Gold Trim Skinpack",
      code: "desertGTSP",
      cost: "250000",
    },
    {
      name: "Ocean Gold Trim Skinpack",
      code: "oceanGTSP",
      cost: "250000",
    },
    {
      name: "Arctic Gold Trim Skinpack",
      code: "arcticGTSP",
      cost: "250000",
    },
  ],

  // 1 hour luck

  chartLimits: [
    {
      category: "trash",
      limit: 3
    }
  ],

  normalChartLimits: [
    {
      category: "trash",
      limit: 5
    }
  ],

  mediumChartLimits: [
    {
      category: "trash",
      limit: 5
    },
    {
      category: "common",
      limit: 3
    }
  ],

  hardChartLimits: [
    {
      category: "trash",
      limit: 5
    },
    {
      category: "common",
      limit: 3
    },
    {
      category: "uncommon",
      limit: 1
    }
  ],

  eventChartLimits: [
    {
      category: "trash",
      limit: 5
    },
    {
      category: "common",
      limit: 3
    }
  ],

  eventChallengeData: [
    {
      category: "trash",
      rares: [ "chocoToucan", "keelBilledToucan", "markhor", "yellowPufferfish" ],
      points: 1,
    },
    {
      category: "common",
      rares: [ "doe", "blueMacaw", "jaguar", "leopard", "fieryToucan", "lionCub", "lioness" ],
      points: 2,
    },
    {
      category: "uncommon",
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

  challengeData: [
    {
      category: "trash",
      rares: [ "chocoToucan", "keelBilledToucan", "markhor", "yellowPufferfish" ],
      points: 1,
    },
    {
      category: "common",
      rares: [ "doe", "blueMacaw", "jaguar", "leopard", "fieryToucan", "lionCub", "lioness" ],
      points: 2,
    },
    {
      category: "uncommon",
      rares: [ "whiteDove", "pinkyPig", "marshDeer", "goldenPheasant", "momaffie", "momaffieFamily", "blackPanther", "whiteTiger", "blackManedLion" ],
      points: 3,
    },
    {
      category: "rare",
      rares: [ "jackass", "whiteLion", "whiteLioness", "whiteLionCub", "bigGoat" ],
      points: 5,
    },
    {
      category: "epic",
      rares: [ "girabie", "stinkyPig", "muskDeer", "predator", "goldenEagle" ],
      points: 10,
    },
    {
      category: "legendary",
      rares: [ "blackLion", "blackLioness", "blackLionCub", "whiteRhino", "aquaYeti" ],
      points: 15,
    },
    {
      category: "mythic",
      rares: [ "lavaToucan",  "demonPufferfish",  "blackRhino",  "whiteGiraffe",  "giraffeFamily" ],
      points: 25,
    },
    {
      category: "divine",
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
    rareKingDragon: ["kd", "kingdragon"]
  },

  // snora 

  tierRareAnimals: [
    { tier: 2, animalIDs: [ "whiteDove" ] },
    { tier: 4, animalIDs: [ "pinkyPig", "stinkyPig" ] },
    { tier: 5, animalIDs: [ "doe", "marshDeer", "muskDeer", "goldenPheasant" ] },
    { tier: 7, animalIDs: [ "jackass", "blueMacaw", "rareMacaw" ] },
    { tier: 8, animalIDs: [ "momaffie", "momaffieFamily", "girabie" ] },
    { tier: 9, animalIDs: [ "jaguar", "leopard", "blackPanther", "chocoToucan", "keelBilledToucan", "fieryToucan", "lavaToucan", "rareToucan", "yellowPufferfish", "demonPufferfish" ] },
    { tier: 10, animalIDs: [ "whiteTiger" ] },
    { tier: 11, animalIDs: [ "lionCub", "whiteLionCub", "blackLionCub", "lioness", "whiteLioness", "blackLioness", "blackManedLion", "whiteLion", "blackLion", "predator", "shaheen", "rareVulture" ] },
    { tier: 12, animalIDs: [ "whiteRhino", "blackRhino", "goldenEagle", "harpyEagle", "greaterSpottedEagle", "markhor", "bigGoat" ] },
    { tier: 13, animalIDs: [ "whiteGiraffe", "giraffeFamily" ] },
    { tier: 15, animalIDs: [ "aquaYeti", "rareSnowman", "rareSnowgirl", "rareBigfoot" ] },
    { tier: 17, animalIDs: [ "rareKingDragon" ] }
  ],
});