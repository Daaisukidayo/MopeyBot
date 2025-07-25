// ========== ENVIRONMENT CONFIGURATION ==========
// Load environment variables before anything else

const dotenv = require("dotenv");
dotenv.config();

// ========== IMPORTS ==========
// Bring in the essentials for our bot’s operations

const { ForgeClient, LogPriority } = require("@tryforge/forgescript");
const { ForgeDB } = require("@tryforge/forge.db");
const { ForgeCanvas } = require("@tryforge/forge.canvas");

// ========== CLIENT CONFIGURATION ==========
// Initialize the bot client with extensions, intents, and events

const DB = new ForgeDB({
  events: ["connect"],
});

const FC = new ForgeCanvas();

const client = new ForgeClient({
  mobile: true,
  extensions: [
    DB, // Adds database capabilities
    FC, // Adds Forge Canvas
  ],
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    "DirectMessageReactions",
    "MessageContent",
  ],
  events: ["interactionCreate", "messageCreate", "ready"],
  prefixes: ["$if[$guildID!=;$getGuildVar[prefix];$getGlobalVar[prefix]]"],
  logLevel: LogPriority.VeryLow,
});

// ========== LOAD COMMANDS ==========
client.commands.load("./commands");

// ========== LOGIN ==========
client.login(process.env.TOKEN);

// ========== READY EVENT ==========
// Executes when the bot is ready

DB.commands.add({
  type: "connect",
  code: `
    $logger[Info;Connected to the database]
  `,
});

// ========== VARIABLES ==========

DB.variables({
  //User variables

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
    l10n: "EN",
    timezone: "Etc/UTC",

    limiters: {
      lastDailyDay: -1,
      lastWeeklyWeek: -1,
      lastHLUsed: -1,
      HLRandom: -1,
      luckDesc: "",
    },

    "1hl": {
      history: [],
      settings: {
        hidePoints: false,
        hideRares: false,
        infiniteCommons: false,
      },
    },

    userPacks: {},

    caughtRareCategories: {
      inferno: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      medium: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      hard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      insane: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      impossible: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      luckSnowman: 0,
      luckSnowgirl: 0,
      luckBigfoot: 0,
      dinoMonster: 0,
      landMonster: 0,
      giantScorpion: 0,
      seaMonster: 0,
      iceMonster: 0,
      blackDragon: 0,
      kingDragon: 0,
    },
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
    MessageID: "",
    ChannelID: "",
    GuildID: "",

    apex: {
      dragon: false,
      trex: false,
      phoenix: false,
      pterodactyl: false,
      kraken: false,
      kingCrab: false,
      yeti: false,
      landMonster: false,
      dinoMonster: false,
      giantScorpion: false,
      seaMonster: false,
      iceMonster: false,
      blackDragon: false,
    },
  },

  userBackup: {},

  // Guild variables

  prefix: ".",

  // For devs

  allUserIDs: [],
  allTesterIDs: [],

  botEnabled: true,
  maxID: 0,
  emoji: "<:MopeCoin:705856410940080232>",
  defaultColor: "#FFD700",
  errorColor: "#D0321D",
  luckyColor: "#228B22",
  cooldownColor: "#7303b7",
  logColor: "#2019b3",
  apexEmbedColor: "#000000",
  blank: "<:blank:898514292926713866>",
  author: "$author[$userDisplayName • MUID: $env[userProfile;MUID];$userAvatar]",
  reportChannelID: "1372645851159330947",
  logChannelID: "1391387203871047731",
  backupLogCount: 0,
  makeBackups: false,
  biomeColors: {
    Land: "#00ff3c",
    Desert: "#ffcc00",
    Volcano: "#ff0000",
    Ocean: "#3498db",
    Arctic: "#ffffff",
    Forest: "#006400",
  },

  raretryVarData: {
    coinsForRaretry: {
      inferno: [0, 0, 0, 0, 190, 375, 560, 750, 940],
      other: [
        0, 0, 500, 1500, 4000, 10500, 55000, 165000, 275000, 550000, 1375000, 2750000, 5500000,
      ],
    },

    chancesForRaretry: {
      inferno: [1, 2, 3, 4, 5, 10, 15, 20, 25],
      other: [
        3, 5, 10, 30, 75, 200, 1000, 3000, 5000, 10000, 25000, 50000, 100000,
      ],
    },

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
      "Inferno",
      "Default",
      "Medium",
      "Hard",
      "Insane",
      "Impossible",
    ],

    multipliersForRaretry: [1, 1.25, 1.5, 1.75, 2],
  },

  shopItems: [
    {
      name: "legacySP",
      description: "Legacy Skinpack",
      code: "legacy",
      cost: "200000",
    },
    {
      name: "lockedSP",
      description: "Locked Skinpack",
      code: "lsp",
      cost: "14229000",
    },
    {
      name: "goldenSP",
      description: "Golden Skinpack",
      code: "gsp",
      cost: "10820000",
    },
    {
      name: "storefrontSP",
      description: "Storefront Skinpack",
      code: "sfsp",
      cost: "1177000",
    },
    {
      name: "summer2021SP",
      description: "Summer 2021 Skinpack",
      code: "ssp2021",
      cost: "2359000",
    },
    {
      name: "summer2022SP",
      description: "Summer 2022 Skinpack",
      code: "ssp2022",
      cost: "485000",
    },
    {
      name: "halloween2020SP",
      description: "Halloween 2020 Skinpack",
      code: "hsp2020",
      cost: "2105000",
    },
    {
      name: "halloween2021SP",
      description: "Halloween 2021 Skinpack",
      code: "hsp2021",
      cost: "2545000",
    },
    {
      name: "halloween2022SP",
      description: "Halloween 2022 Skinpack",
      code: "hsp2022",
      cost: "1770000",
    },
    {
      name: "halloween2023SP",
      description: "Halloween 2023 Skinpack",
      code: "hsp2023",
      cost: "1570000",
    },
    {
      name: "may2022SP",
      description: "May 2022 Skinpack",
      code: "may2022",
      cost: "749000",
    },
    {
      name: "christmas2022SP",
      description: "Christmas 2022 Skinpack",
      code: "chsp2022",
      cost: "300000",
    },
    {
      name: "valentine2023SP",
      description: "Valentine 2023 Skinpack",
      code: "vsp2023",
      cost: "1600000",
    },
    {
      name: "landGTSP",
      description: "Gold Trim Land Skinpack",
      code: "landgt",
      cost: "250000",
    },
    {
      name: "desertGTSP",
      description: "Gold Trim Desert Skinpack",
      code: "desertgt",
      cost: "250000",
    },
    {
      name: "oceanGTSP",
      description: "Gold Trim Ocean Skinpack",
      code: "oceangt",
      cost: "250000",
    },
    {
      name: "arcticGTSP",
      description: "Gold Trim Arctic Skinpack",
      code: "arcticgt",
      cost: "250000",
    },
  ],

  chartLimits: [
    {
      category: "trash",
      limit: 3
    }
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
      category: "godlike",
      rares: [ "rareMacaw", "rareToucan", "rareVulture", "shaheen", "harpyEagle", "greaterSpottedEagle", "luckBigfoot",  "luckSnowman",  "luckSnowgirl",  "kingDragon" ],
      points: 50,
    },
  ],

  raresMapOld: [
    {
      category: "common",
      rares: ["chocoToucan", "keelBilledToucan", "markhor"],
      points: 1,
    },
    {
      category: "uncommon",
      rares: [
        "doe",
        "blueMacaw",
        "jaguar",
        "leopard",
        "fieryToucan",
        "yellowPufferfish",
        "lioness",
      ],
      points: 2,
    },
    {
      category: "rare",
      rares: [
        "whiteDove",
        "pinkyPig",
        "marshDeer",
        "goldenPheasant",
        "momaffie",
        "momaffieFamily",
        "blackPanther",
        "lionCub",
        "blackManedLion",
      ],
      points: 3,
    },
    {
      category: "epic",
      rares: [
        "jackass",
        "girabie",
        "whiteTiger",
        "whiteLion",
        "whiteLioness",
        "whiteLionCub",
        "bigGoat",
        "shopBigfoot",
        "shopSnowman",
        "shopSnowgirl",
      ],
      points: 5,
    },
    {
      category: "insane",
      rares: [
        "stinkyPig",
        "muskDeer",
        "blackLion",
        "blackLioness",
        "blackLionCub",
        "predator",
        "goldenEagle",
        "whiteRhino",
        "aquaYeti",
      ],
      points: 8,
    },
    {
      category: "legendary",
      rares: ["lavaToucan", "demonPufferfish", "blackRhino", "whiteGiraffe"],
      points: 15,
    },
    {
      category: "extreme",
      rares: ["giraffeFamily"],
      points: 20,
    },
    {
      category: "mythic",
      rares: ["luckBigfoot", "luckSnowman", "luckSnowgirl", "kingDragon"],
      points: 30,
    },
    {
      category: "godly",
      rares: [
        "rareMacaw",
        "rareToucan",
        "rareVulture",
        "shaheen",
        "harpyEagle",
        "greaterSpottedEagle",
      ],
      points: 50,
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
    chocoToucan: ["cht", "chocotoucan"],
    keelBilledToucan: ["kbt", "keelbilledtoucan"],
    fieryToucan: ["ft", "fierytoucan"],
    lavaToucan: ["lt", "lavatoucan"],
    rareToucan: ["hht", "helmetedhornbill"],
    yellowPufferfish: ["ypf", "yp", "yellowpufferfish"],
    demonPufferfish: ["dp", "df", "dpf", "demonfish", "demonpufferfish"],
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
    aquaYeti: ["ay", "aquayeti"],
    luckSnowman: ["lsm", "lucksnowman"],
    luckBigfoot: ["lbf", "luckbigfoot"],
    luckSnowgirl: ["lsg", "lucksnowgirl"],
    kingDragon: ["kd", "kingdragon"]
  },

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
    { tier: 15, animalIDs: [ "aquaYeti", "luckSnowman", "luckSnowgirl", "luckBigfoot" ] },
    { tier: 17, animalIDs: [ "kingDragon" ] }
  ],


  allVariants: [
    { v: "s1", req: null },
    { v: "s1-v1", req: null },
    { v: "s2", req: null },
    { v: "s2-w", req: null },
    { v: "legacy", req: "legacySP" },
    { v: "legacy-w", req: "legacySP" },
    { v: "legacy-w-v1", req: "legacySP" },
    { v: "sfsp", req: "storefrontSP" },
    { v: "gsp", req: "goldenSP" },
    { v: "lsp", req: "lockedSP" },
    { v: "ssp2021", req: "summer2021SP" },
    { v: "ssp2022", req: "summer2022SP" },
    { v: "may2022", req: "may2022SP" },
    { v: "christmas2022", req: "christmas2022SP" },
    { v: "valentine2023", req: "valentine2023SP" },
    { v: "hsp2020", req: "halloween2020SP" },
    { v: "hsp2021", req: "halloween2021SP" },
    { v: "hsp2022", req: "halloween2022SP" },
    { v: "hsp2023", req: "halloween2023SP" },
    { v: "landgt", req: "landGTSP" },
    { v: "desertgt", req: "desertGTSP" },
    { v: "oceangt", req: "oceanGTSP" },
    { v: "arcticgt", req: "arcticGTSP" },
    { v: "promo", req: null },
  ],

  // future content
  teams: [
    {
      name: "Team 1",
      allies: [
        {
          name: "",
          image: "",
        },
        {
          name: "",
          image: "",
        },
        {
          name: "",
          image: "",
        },
      ],
    },
    {
      name: "Team 2",
      allies: [
        {
          name: "",
          image: "",
        },
        {
          name: "",
          image: "",
        },
        {
          name: "",
          image: "",
        },
      ],
    },
    {
      name: "Team 3",
      allies: [
        {
          name: "",
          image: "",
        },
        {
          name: "",
          image: "",
        },
        {
          name: "",
          image: "",
        },
      ],
    },
  ],
});

// ========== FUNCTIONS ==========
// Executes when a user doesn't accept the rules

client.functions.add({
  name: "rulesSchema",
  code: `
    $return[
      $onlyIf[$getUserVar[userProfile]!=;$reply Your data had been corrupted. Load your last saved backup to restore data.]
      $addActionRow
      $addButton[acceptrules-$authorID;Accept;Success;✅]
      $addButton[declinerules-$authorID;Decline;Danger;🛑]
      $callFunction[rulesEmbeds]    
    ]
  `,
});

// Embeds for rules

client.functions.add({
  name: "rulesEmbeds",
  code: `
    $return[  
      $author[Hey, $userDisplayName!;$userAvatar]
      $title[It looks like you haven't accepted the rules yet!]
      $description[### By clicking on "Accept" button, you confirm that you have read and agree to the following important documents:
      # $hyperlink[Information;https://github.com/Daaisukidayo/MopeyBot/blob/main/README.md]
      # $hyperlink[Terms of Service;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md]
      # $hyperlink[Privacy Policy;https://github.com/Daaisukidayo/MopeyBot/blob/main/Mopey's_TOS.md#-privacy-policy]
      # $hyperlink[Rules;https://github.com/Daaisukidayo/MopeyBot/blob/main/Rules.md]]
      $color[$getGlobalVar[cooldownColor]]
    ]
  `,
});

// Executes when on cooldown

client.functions.add({
  name: "cooldownSchema",
  params: ["name"],
  code: `
    $let[time;$getUserCooldownTime[$env[name]]]
    $let[cooldownTime;$sum[$getTimestamp;$get[time]]]
    $let[longDateTime;$discordTimestamp[$get[cooldownTime];LongDateTime]]
    $let[relativeTimeLeft;$discordTimestamp[$get[cooldownTime];RelativeTime]]

    $jsonLoad[l;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;l10n]]
    $let[cooldownDesc1;$env[l;cooldown;cooldownDesc1;$get[l10n]]] 
    $let[cooldownDesc2;$advancedReplace[$env[l;cooldown;cooldownDesc2;$get[l10n]];{1};$get[relativeTimeLeft];{2};$get[longDateTime]]] 
    
    $return[
      $getGlobalVar[author]
      $title[⏰ $get[cooldownDesc1]]
      $description[$get[cooldownDesc2]!]
      $color[$getGlobalVar[cooldownColor]]    
      $deleteIn[$if[$or[$get[time]>30000;$get[time]==0];10s;$get[time]]]
    ]
  `,
});

// Function for adding/removing coins

client.functions.add({
  name: "sumMC",
  params: ["amount"],
  code: `
    $return[$!jsonSet[userProfile;MC;$sum[$env[userProfile;MC];$env[amount]]]]
  `,
});

client.functions.add({
  name: "subMC",
  params: ["amount"],
  code: `
    $return[$!jsonSet[userProfile;MC;$sub[$env[userProfile;MC];$env[amount]]]]
  `,
});

// standart checkings before executing command

client.functions.add({
  name: "checking",
  code: `
    $if[$env[userProfile;devMode];;
      $onlyIf[$getGlobalVar[botEnabled]]
    ]
    $onlyIf[$env[userProfile;isBanned]!=true]
    $onlyIf[$env[userProfile;acceptedRules];$callFunction[rulesSchema]]
    $onlyIf[$env[userProfile;onSlowmode]!=true]
  `,
});

// adding cooldown

client.functions.add({
  name: "cooldown",
  params: ["time"],
  code: `
    $if[$env[userProfile;devMode]!=false;;
      $userCooldown[$commandName;$env[time];$callFunction[cooldownSchema;$commandName]]
    ]
  `,
});

// when important variables for commands' functionality are deleted

client.functions.add({
  name: "interFail",
  code: `
    $jsonLoad[l;$readFile[json/localizations.json]]
      $let[l10n;$getUserVar[l10n]]
      $let[specialDesc2;$env[l;special;specialDesc2;$get[l10n]]] 
    $ephemeral 
    $interactionReply[$get[specialDesc2]]
  `,
});

// when other people trying to interact with author's button

client.functions.add({
  name: "notYourBTN",
  code: `
    $jsonLoad[l;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;l10n]]
    $let[specialDesc3;$env[l;special;specialDesc3;$get[l10n]]] 
    $ephemeral
    $interactionReply[$get[specialDesc3]]
  `,
});

client.functions.add({
  name: "kdMenu",
  params: ["cond"],
  code: `
    $addActionRow
    $addStringSelectMenu[$env[cond]kdmenu-$authorID;Choose an upgrade:]

    $addOption[$env[KDvar;0;name];;$env[cond]kds1-$authorID;$env[KDvar;0;emoji]]
    $addOption[$env[KDvar;1;name];;$env[cond]kds2-$authorID;$env[KDvar;1;emoji]]
    
    $if[$env[userProfile;userPacks;lockedSP];
      $addOption[$env[KDvar;2;name];;$env[cond]ksh-$authorID;$env[KDvar;2;emoji]]
      $addOption[$env[KDvar;3;name];;$env[cond]kst-$authorID;$env[KDvar;3;emoji]]
      $addOption[$env[KDvar;4;name];;$env[cond]kr-$authorID;$env[KDvar;4;emoji]]
      $addOption[$env[KDvar;5;name];;$env[cond]qc-$authorID;$env[KDvar;5;emoji]]
      $addOption[$env[KDvar;6;name];;$env[cond]qs-$authorID;$env[KDvar;6;emoji]]
    ]
    $if[$env[userProfile;userPacks;goldenSP];
      $addOption[$env[KDvar;7;name];;$env[cond]gkd-$authorID;$env[KDvar;7;emoji]]
    ] 
    $if[$env[userProfile;userPacks;storefrontSP];
      $addOption[$env[KDvar;8;name];;$env[cond]qf-$authorID;$env[KDvar;8;emoji]]
    ]
  `,
});
