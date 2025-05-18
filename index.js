// ========== ENVIRONMENT CONFIGURATION ==========
// Load environment variables before anything else

const dotenv = require("dotenv");
dotenv.config();

// ========== IMPORTS ==========
// Bring in the essentials for our bot’s operations

const { ForgeClient, LogPriority } = require("@tryforge/forgescript");
const { ForgeDB } = require("@tryforge/forge.db");


// ========== CLIENT CONFIGURATION ==========
// Initialize the bot client with extensions, intents, and events

const client = new ForgeClient({
  mobile: true,
  disableConsoleErrors: true,
  allowBots: false,
  extensions: [
    new ForgeDB(), // Adds database capabilities
  ],
  intents: [
    "Guilds",
    "GuildMessages",
    "DirectMessages",
    "DirectMessageReactions",
    "MessageContent",
  ],
  events: [
    "channelCreate",
    "channelDelete",
    "channelUpdate",
    "debug",
    "emojiCreate",
    "emojiDelete",
    "emojiUpdate",
    "error",
    "guildAuditLogEntryCreate",
    "guildCreate",
    "guildDelete",
    "guildMemberAdd",
    "guildMemberRemove",
    "guildMemberUpdate",
    "guildUpdate",
    "interactionCreate",
    "inviteCreate",
    "inviteDelete",
    "messageCreate",
    "messageDelete",
    "messageReactionAdd",
    "messageReactionRemove",
    "messageUpdate",
    "ready",
    "roleCreate",
    "roleDelete",
    "roleUpdate",
    "shardDisconnect",
    "shardError",
    "shardReady",
    "shardReconnecting",
    "shardResume",
    "userUpdate",
    "voiceStateUpdate"
  ],
  prefixes: ["$if[$guildID!=;$getGuildVar[prefix];.]"],
});

// ========== LOAD COMMANDS ==========
client.commands.load("./commands");

// ========== LOGIN ==========
client.login(process.env.TOKEN);

// ========== READY EVENT ==========
// Executes when the bot is ready

client.commands.add({
  type: "ready",
  code: `
    
    $async[
      $deletevars[page;;message]
      $deletevars[crpage;;message]
      $deletevars[pages;;message]
      $deletevars[rowsPerPage;;message]
      $log[Unused message variables have been cleared!]
    ]

    $async[
      $setStatus[online;Watching;$guildCount servers]
      $log[$username[$botID] is now online!]
    ]
  `
})

// ========== VARIABLES ==========

ForgeDB.variables({
  isTester: false,
  onSlowmode: false,
  isBanned: false,
  dev: false,
  acceptedRules: false,
  rtMode: "default",
  MC: 0,
  MUID: -1,
  l10n: "EN",
  
  botEnabled: true,
  maxID: 0,
  prefix: "//",
  emoji: "<:MopeCoin:705856410940080232>",
  defaultColor: "#FFD700",
  errorColor: "#D0321D",
  luckyColor: "#228B22",
  cooldownColor: "#7303b7",
  logColor: "#2019b3",
  blank: "<:blank:898514292926713866>",
  author: "$author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]",
  reportChannelID: "1372645851159330947",

  caughtRareCategories: {
    inferno: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    medium: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    insane: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    impossible: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },

  raretryVarData: {
    coinsForRaretry: {
      inferno: [0, 0, 0, 0, 0, 100, 110, 120, 130],
      other: [0, 0, 500, 1500, 4000, 10500, 55000, 165000, 275000, 550000, 1375000, 2750000, 5500000]
    },

    chancesForRaretry: {
      inferno: [1, 2, 3, 4, 5, 10, 15, 20, 25],
      other: [3, 5, 10, 30, 75, 200, 1000, 3000, 5000, 10000, 25000, 50000, 100000],
    },

    categories: ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Extreme", "Mythic", "Godly", "Ultra"],
    raretryModes: ["Inferno", "Default", "Medium", "Hard", "Insane", "Impossible"],

    multipliersForRaretry: [1, 1.25, 1.5, 1.75, 2],
  },

  userPacks: {},

  userWardrobe: {   
    "mouse": "v0",   
    "desertRat": "v0",   
    "shrimp": "v0",   
    "arcticChipmunk": "v0",   
    "tarsier": "v0",
    "rabbit": "v0",
    "pigeon": "v0",
    "whiteDove": "v0",
    "desertChipmunk": "v0",
    "trout": "v0",
    "arcticHare": "v0",
    "chukar": "v0",
    "mole": "v0",
    "chicken": "v0",
    "meerkat": "v0",
    "crab": "v0",
    "penguin": "v0",
    "flyingLizard": "v0",
    "pig": "v0",
    "pinkyPig": "v0",
    "stinkyPig": "v0",
    "woodpecker": "v0",
    "armadillo": "v0",
    "seaHorse": "v0",
    "seal": "v0",
    "kakapo": "v0",
    "deer": "v0",
    "doe": "v0",
    "marshDeer": "v0",
    "gazelle": "v0",
    "squid": "v0",
    "flamingo": "v0",
    "reindeer": "v0",
    "muskDeer": "v0",
    "swinehoe": "v0",
    "goldenPheasant": "v0",
    "fox": "v0",
    "hedgehog": "v0",
    "peacock": "v0",
    "fennecFox": "v0",
    "jellyfish": "v0",
    "arcticFox": "v0",
    "zebra": "v0",
    "donkey": "v0",
    "jackass": "v0",
    "macaw": "v0",
    "blueMacaw": "v0",
    "rareMacaw": "v0",
    "warthog": "v0",
    "turtle": "v0",
    "muskox": "v0",
    "cobra": "v0",
    "giraffe": "v0",
    "momaffie": "v0",
    "momaffieFamily": "v0",
    "girabie": "v0",
    "camel": "v0",
    "stingray": "v0",
    "snowyOwl": "v0",
    "walrus": "v0",
    "raven": "v0",
    "cheetah": "v0",
    "jaguar": "v0",
    "leopard": "v0",
    "blackPanther": "v0",
    "gorilla": "v0",
    "toucan": "v0",
    "chocoToucan": "v0",
    "keelBilledToucan": "v0",
    "fieryToucan": "v0",
    "lavaToucan": "v0",
    "rareToucan": "v0",
    "rattleSnake": "v0",
    "pufferfish": "v0",
    "yellowPufferfish": "v0",
    "demonPufferfish": "v0",
    "snowLeopard": "v0",
    "turkey": "v0",
    "bear": "v0",
    "blackBear": "v0",
    "tiger": "v0",
    "whiteTiger": "v0",
    "blackTiger": "v0",
    "gobiBear": "v0",
    "hyena": "v0",
    "pelican": "v0",
    "swordfish": "v0",
    "wolf": "v0",
    "crocodile": "v0",
    "lion": "v0",
    "blackManedLion": "v0",
    "whiteLion": "v0",
    "blackLion": "v0",
    "lioness": "v0",
    "whiteLioness": "v0",
    "blackLioness": "v0",
    "lionCub": "v0",
    "whiteLionCub": "v0",
    "blackLionCub": "v0",
    "falcon": "v0",
    "predator": "v0",
    "shaheen": "v0",
    "vulture": "v0",
    "rareVulture": "v0",
    "octopus": "v0",
    "polarBear": "v0",
    "rhino": "v0",
    "whiteRhino": "v0",
    "blackRhino": "v0",
    "baldEagle": "v0",
    "goldenEagle": "v0",
    "harpyEagle": "v0",
    "greaterSpottedEagle": "v0",
    "bison": "v0",
    "shark": "v0",
    "markhor": "v0",
    "bigGoat": "v0",
    "wolverine": "v0",
    "hippo": "v0",
    "boaConstrictor": "v0",
    "ostrich": "v0",
    "komodoDragon": "v0",
    "killerWhale": "v0",
    "sabertoothTiger": "v0",
    "whiteGiraffe": "v0",
    "whiteGiraffeFamily": "v0",
    "elephant": "v0",
    "cassowary": "v0",
    "giantSpider": "v0",
    "blackwidowSpider": "v0",
    "blueWhale": "v0",
    "mammoth": "v0",
    "dragon": "v0",
    "trex": "v0",
    "phoenix": "v0",
    "pterodactyl": "v0",
    "kraken": "v0",
    "kingCrab": "v0",
    "yeti": "v0",
    "aquaYeti": "v0",
    "snowman": "v0",
    "snowgirl": "v0",
    "bigfoot": "v0",
    "dinoMonster": "v0",
    "landMonster": "v0",
    "giantScorpion": "v0",
    "seaMonster": "v0",
    "iceMonster": "v0",
    "blackDragon": "v0",
    "kingDragon": "v0"
  },

  shopItems: `
    {
      "name": "legacySP",
      "description": "Legacy Skinpack",
      "cost": "200000"
    }, 
    {
      "name": "lockedSP",
      "description": "Locked Skinpack",
      "cost": "14229000"
    }, 
    {
      "name": "goldenSP",
      "description": "Golden Skinpack",
      "cost": "10820000"
    }, 
    {
      "name": "storefrontSP",
      "description": "Storefront Skinpack",
      "cost": "1177000"
    }, 
    {
      "name": "summer2021SP",
      "description": "Summer 2021 Skinpack",
      "cost": "2359000"
    }, 
    {
      "name": "summer2022SP",
      "description": "Summer 2022 Skinpack",
      "cost": "485000"
    }, 
    {
      "name": "halloween2020SP",
      "description": "Halloween 2020 Skinpack",
      "cost": "2105000"
    }, 
    {
      "name": "halloween2021SP",
      "description": "Halloween 2021 Skinpack",
      "cost": "2545000"
    }, 
    {
      "name": "halloween2022SP",
      "description": "Halloween 2022 Skinpack",
      "cost": "1770000"
    }, 
    {
      "name": "halloween2023SP",
      "description": "Halloween 2023 Skinpack",
      "cost": "1570000"
    }, 
    {
      "name": "may2022SP",
      "description": "May 2022 Skinpack",
      "cost": "749000"
    }, 
    {
      "name": "christmas2022SP",
      "description": "Christmas 2022 Skinpack",
      "cost": "300000"
    }, 
    {
      "name": "valentine2023SP",
      "description": "Valentine 2023 Skinpack",
      "cost": "1600000"
    }, 
    {
      "name": "landGTSP",
      "description": "Land Gold-Trim Skinpack",
      "cost": "250000"
    }, 
    {
      "name": "desertGTSP",
      "description": "Desert Gold-Trim Skinpack",
      "cost": "250000"
    }, 
    {
      "name": "oceanGTSP",
      "description": "Ocean Gold-Trim Skinpack",
      "cost": "250000"
    }, 
    {
      "name": "arcticGTSP",
      "description": "Arctic Gold-Trim Skinpack",
      "cost": "250000"
    }
  `,
  raresMap: `
    {
      "category": "common",
      "rares": ["cht", "kbt", "mar", "chocotoucan", "keelbilledtoucan", "markhor"\],
      "points": 1
    }, 
    {
      "category": "uncommon",
      "rares": ["doe", "bm", "jag", "leo", "ft", "yp", "ln", "bluemacaw", "jaguar", "leopard", "fierytoucan", "yellowpufferfish", "lioness"\],
      "points": 2
    }, 
    {
      "category": "rare",
      "rares": ["wd", "pp", "mad", "gph", "mom", "mf", "bp", "lc", "bml", "whitedove", "pinkypig", "marshdeer", "goldenpheasant", "momaffie", "momaffiefamily", "blackpanther", "lioncub", "blackmanedlion"\],
      "points": 3
    }, 
    {
      "category": "epic",
      "rares": ["jac", "gir", "wt", "wl", "wln", "wlc", "bg", "sbf", "ssm", "ssg", "jackass", "girabie", "whitetiger", "whitelion", "whitelioness", "whitelioncub", "biggoat", "shopbigfoot", "shopsnowman", "shopsnowgirl"\],
      "points": 5
    }, 
    {
      "category": "insane",
      "rares": ["sp", "mud", "bl", "bln", "blc", "pre", "ge", "wr", "ay", "stinkypig", "muskdeer", "blacklion", "blacklioness", "blacklioncub", "predator", "goldeneagle", "whiterhino", "aquayeti"\],
      "points": 8
    }, 
    {
      "category": "legendary",
      "rares": ["lt", "dp", "br", "wg", "lavatoucan", "demonfish", "blackrhino", "whitegiraffe"\],
      "points": 15
    }, 
    {
      "category": "extreme",
      "rares": ["gf", "giraffefamily"\],
      "points": 20
    }, 
    {
      "category": "mythic",
      "rares": ["lbf", "lsm", "lsg", "kd", "luckbigfoot", "lucksnowman", "lucksnowgirl", "kingdragon"\],
      "points": 30
    }, 
    {
      "category": "godly",
      "rares": ["sm", "hht", "arg", "shh", "har", "gse", "spixmacaw", "helmetedhornbill", "argentavis", "shaheen", "harpyeagle", "greaterspottedeagle"\],
      "points": 50
    }
  `,

  SNORA: {
      "wd": "White Dove",
      "pp": "Pinky Pig",
      "sp": "Stinky Pig",
      "doe": "Doe",
      "mad": "Marsh Deer",
      "mud": "Musk Deer",
      "gph": "Golden Pheasant",
      "bm": "Blue Macaw",
      "sm": "Spix Macaw",
      "jac": "Jackass",
      "mom": "Momaffie",
      "mf": "Momaffie Family",
      "gir": "Girabie",
      "jag": "Jaguar",
      "leo": "Leopard",
      "bp": "Black Panther",
      "cht": "Choco Toucan",
      "kbt": "Keel-Billed Toucan",
      "ft": "Fiery Toucan",
      "lt": "Lava Toucan",
      "hht": "Helmeted Hornbill Toucan",
      "yp": "Yellow Pufferfish",
      "dp": "Demon Pufferfish",
      "wt": "White Tiger",
      "lc": "Lion Cub",
      "wlc": "White Lion Cub",
      "blc": "Black Lion Cub",
      "ln": "Lioness",
      "wln": "White Lioness",
      "bln": "Black Lioness",
      "bml": "Black-Maned Lion",
      "wl": "White Lion",
      "bl": "Black Lion",
      "arg": "Argentavis",
      "pre": "Predator",
      "shh": "Shaheen",
      "wr": "White Rhino",
      "br": "Black Rhino",
      "ge": "Golden Eagle",
      "har": "Harpy Eagle",
      "gse": "Greater-Spotted Eagle",
      "mar": "Markhor",
      "bg": "Big Goat",
      "wg": "White Giraffe",
      "gf": "Giraffe Family",
      "ay": "Aqua Yeti",
      "ssm": "Shop Snowman",
      "lsm": "Luck Snowman",
      "sbf": "Shop BigFoot",
      "lbf": "Luck BigFoot",
      "ssg": "Shop Snowgirl",
      "lsg": "Luck Snowgirl",
      "kd": "King Dragon",
      "whitedove": "White Dove",
      "pinkypig": "Pinky Pig",
      "stinkypig": "Stinky Pig",
      "doe": "Doe",
      "marshdeer": "Marsh Deer",
      "muskdeer": "Musk Deer",
      "goldenpheasant": "Golden Pheasant",
      "bluemacaw": "Blue Macaw",
      "spixmacaw": "Spix Macaw",
      "jackass": "Jackass",
      "momaffie": "Momaffie",
      "momaffiefamily": "Momaffie Family",
      "girabie": "Girabie",
      "jaguar": "Jaguar",
      "leopard": "Leopard",
      "blackpanther": "Black Panther",
      "chocotoucan": "Choco Toucan",
      "keelbilledtoucan": "Keel-Billed Toucan",
      "fierytoucan": "Fiery Toucan",
      "lavatoucan": "Lava Toucan",
      "helmetedhornbill": "Helmeted Hornbill Toucan",
      "yellowpufferfish": "Yellow Pufferfish",
      "demonfish": "Demon Pufferfish",
      "whitetiger": "White Tiger",
      "lioncub": "Lion Cub",
      "whitelioncub": "White Lion Cub",
      "blacklioncub": "Black Lion Cub",
      "lioness": "Lioness",
      "whitelioness": "White Lioness",
      "blacklioness": "Black Lioness",
      "blackmanedlion": "Black-Maned Lion",
      "whitelion": "White Lion",
      "blacklion": "Black Lion",
      "argentavis": "Argentavis",
      "predator": "Predator",
      "shaheen": "Shaheen",
      "whiterhino": "White Rhino",
      "blackrhino": "Black Rhino",
      "goldeneagle": "Golden Eagle",
      "harpyeagle": "Harpy Eagle",
      "greaterspottedeagle": "Greater-Spotted Eagle",
      "markhor": "Markhor",
      "biggoat": "Big Goat",
      "whitegiraffe": "White Giraffe",
      "giraffefamily": "Giraffe Family",
      "aquayeti": "Aqua Yeti",
      "shopsnowman": "Shop Snowman",
      "lucksnowman": "Luck Snowman",
      "shopbigfoot": "Shop BigFoot",
      "luckbigfoot": "Luck BigFoot",
      "shopsnowgirl": "Shop Snowgirl",
      "lucksnowgirl": "Luck Snowgirl",
      "kingdragon": "King Dragon"
  },
  allVariants: ["s1", "s2", "s2-w", "legacy", "legacy-w", "sfsp", "ssp2021", "ssp2022", "may2022", "christmas2022", "valentine2023", "gsp", "lsp", "hsp2020", "hsp2021", "hsp2022", "hsp2023", "landgt", "desertgt", "oceangt", "arcticgt", "promo"],
});

// ========== FUNCTIONS ==========
// Executes when a user doesn't accept the rules

client.functions.add({
  name: "rulesSchema",
  code: `
 
    $return[
      $addActionRow
      $addButton[acceptrules-$authorID;Accept;Success;✅]
      $addButton[declinerules-$authorID;Decline;Danger;🛑]
      $callFunction[rulesEmbeds;]    
    ]
  `
})

// Embedds for rules

client.functions.add({
  name: "rulesEmbeds",
  code:
    `
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
  `
})

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
    $let[l10n;$getUserVar[l10n]]
    $let[cooldownDesc1;$env[l;cooldown;cooldownDesc1;$get[l10n]]] 
    $let[cooldownDesc2;$advancedReplace[$env[l;cooldown;cooldownDesc2;$get[l10n]];{1};$get[relativeTimeLeft];{2};$get[longDateTime]]] 
    
    $return[
      $getGlobalVar[author]
      $title[⏰ $get[cooldownDesc1]]
      $description[$get[cooldownDesc2]!]
      $color[$getGlobalVar[cooldownColor]]    
      $deleteIn[$if[$or[$get[time]>30000;$get[time]==0];10s;$get[time]]]
    ]
  `
});

// Function for adding/removing coins

client.functions.add({
  name: "sumMC",
  params: ["amount"],
  code: `$return[$setUserVar[MC;$sum[$getUserVar[MC];$env[amount]]]]`
})

client.functions.add({
  name: "subMC",
  params: ["amount"],
  code: `$return[$setUserVar[MC;$sub[$getUserVar[MC];$env[amount]]]]`
})

// standart checkings before executing command

client.functions.add({
  name: "checking",
  code: `
    $if[$getUserVar[dev]==false;
      $onlyIf[$getGlobalVar[botEnabled]]
    ]
    $onlyIf[$getUserVar[isBanned]==false]
    $onlyIf[$getUserVar[acceptedRules];$callFunction[rulesSchema;]]
    $onlyIf[$getUserVar[onSlowmode]==false]
  `
})

// adding cooldown

client.functions.add({
  name: "cooldown",
  params: ["time"],
  code: `
    $if[$getUserVar[dev];;
      $userCooldown[$commandName;$env[time];$callFunction[cooldownSchema;$commandName]]
    ]
  `
})

// when important variables for commands' functionality are deleted

client.functions.add({
  name: "interFail",
  code: `
  $jsonLoad[l;$readFile[json/localizations.json]]
    $let[l10n;$getUserVar[l10n]]
    $let[specialDesc2;$env[l;special;specialDesc2;$get[l10n]]] 
  $ephemeral 
  $interactionReply[$get[specialDesc2]]`
})

// when other people trying to interact with author's button

client.functions.add({
  name: "notYourBTN",
  code: `
  $jsonLoad[l;$readFile[json/localizations.json]]
    $let[l10n;$getUserVar[l10n]]
    $let[specialDesc3;$env[l;special;specialDesc3;$get[l10n]]] 
  $ephemeral
  $interactionReply[$get[specialDesc3]]`
})

client.functions.add({
  name: "kdMenu",
  params: ["cond"],
  code: `
    $addActionRow
    $addStringSelectMenu[$env[cond]kdmenu-$authorID;Choose an upgrade:]

    $addOption[$env[animals;kingDragon;v0;name];;$env[cond]kds1-$authorID;$env[animals;kingDragon;v0;emoji]]
    $addOption[$env[animals;kingDragon;v1;name];;$env[cond]kds2-$authorID;$env[animals;kingDragon;v1;emoji]]
    
    $if[$env[userPacks;lockedSP];
      $addOption[$env[animals;kingDragon;v2;name];;$env[cond]ksh-$authorID;$env[animals;kingDragon;v2;emoji]]
      $addOption[$env[animals;kingDragon;v3;name];;$env[cond]kst-$authorID;$env[animals;kingDragon;v3;emoji]]
      $addOption[$env[animals;kingDragon;v4;name];;$env[cond]kr-$authorID;$env[animals;kingDragon;v4;emoji]]
      $addOption[$env[animals;kingDragon;v5;name];;$env[cond]qc-$authorID;$env[animals;kingDragon;v5;emoji]]
      $addOption[$env[animals;kingDragon;v6;name];;$env[cond]qs-$authorID;$env[animals;kingDragon;v6;emoji]]
    ]
    $if[$env[userPacks;goldenSP];
      $addOption[$env[animals;kingDragon;v7;name];;$env[cond]gkd-$authorID;$env[animals;kingDragon;v7;emoji]]
    ] 
    $if[$env[userPacks;storefrontSP];
      $addOption[$env[animals;kingDragon;v8;name];;$env[cond]qf-$authorID;$env[animals;kingDragon;v8;emoji]]
    ]
  `
})

client.functions.add({
  name: "raretryData",
  code: `$return[{
      "category_9": {
        "content": ["USSR Macaw <:USSRMacawS2:1288058610655690804>",
          "USSR Toucan <:USSRToucanS2:1288058651075940382>",
          "USSR Vulture <:USSRVultureS2:1288058686241243157>"\\],
    
        "thumbnail": [
          "https://media.discordapp.net/attachments/701793335941136464/1288064073983987787/USSR_Macaw-S2.png",
          "https://media.discordapp.net/attachments/701793335941136464/1288064074365534208/USSR_Toucan-S2.png",
          "https://media.discordapp.net/attachments/701793335941136464/1288064074789421077/USSR_Vulture-S2.png"
        \\],
    
        "color": "B80000"
      },
  
      "category_8": {
        "content": ["$env[animals;shaheen;$env[userWardrobe;shaheen];name] $env[animals;shaheen;$env[userWardrobe;shaheen];emoji]",
          "$env[animals;harpyEagle;$env[userWardrobe;harpyEagle];name] $env[animals;harpyEagle;$env[userWardrobe;harpyEagle];emoji]",
          "$env[animals;greaterSpottedEagle;$env[userWardrobe;greaterSpottedEagle];name] $env[animals;greaterSpottedEagle;$env[userWardrobe;greaterSpottedEagle];emoji]"\\],
    
        "thumbnail": [
          "$env[animals;shaheen;$env[userWardrobe;shaheen];img]",
          "$env[animals;harpyEagle;$env[userWardrobe;harpyEagle];img]",
          "$env[animals;greaterSpottedEagle;$env[userWardrobe;greaterSpottedEagle];img]"
        \\],
    
        "color": "50351E"
      },
  
      "category_7": {
        "content": ["$env[animals;rareMacaw;$env[userWardrobe;rareMacaw];name] $env[animals;rareMacaw;$env[userWardrobe;rareMacaw];emoji]",
          "$env[animals;rareToucan;$env[userWardrobe;rareToucan];name] $env[animals;rareToucan;$env[userWardrobe;rareToucan];emoji]",
          "$env[animals;rareVulture;$env[userWardrobe;rareVulture];name] $env[animals;rareVulture;$env[userWardrobe;rareVulture];emoji]"\\],
    
        "thumbnail": [
          "$env[animals;rareMacaw;$env[userWardrobe;rareMacaw];img]",
          "$env[animals;rareToucan;$env[userWardrobe;rareToucan];img]",
          "$env[animals;rareVulture;$env[userWardrobe;rareVulture];img]"
        \\],
    
        "color": "677caf"
      },
  
      "category_6": {
        "content": ["$env[animals;kingDragon;$env[userWardrobe;kingDragon];name] $env[animals;kingDragon;$env[userWardrobe;kingDragon];emoji]",
          "$env[animals;bigfoot;$env[userWardrobe;bigfoot];name] $env[animals;bigfoot;$env[userWardrobe;bigfoot];emoji]",
          "$env[animals;snowman;$env[userWardrobe;snowman];name] $env[animals;snowman;$env[userWardrobe;snowman];emoji]",
          "$env[animals;snowgirl;$env[userWardrobe;snowgirl];name] $env[animals;snowgirl;$env[userWardrobe;snowgirl];emoji]"\\],
    
        "thumbnail": [
          "$env[animals;kingDragon;$env[userWardrobe;kingDragon];img]",
          "$env[animals;bigfoot;$env[userWardrobe;bigfoot];img]",
          "$env[animals;snowman;$env[userWardrobe;snowman];img]",
          "$env[animals;snowgirl;$env[userWardrobe;snowgirl];img]"
        \\],
    
        "color": "d61b4a"
      },
  
      "category_5": {
        "content": ["$env[animals;whiteGiraffeFamily;$env[userWardrobe;whiteGiraffeFamily];name] $env[animals;whiteGiraffeFamily;$env[userWardrobe;whiteGiraffeFamily];emoji]",
          "$env[animals;whiteGiraffe;$env[userWardrobe;whiteGiraffe];name] $env[animals;whiteGiraffe;$env[userWardrobe;whiteGiraffe];emoji]",
          "$env[animals;blackRhino;$env[userWardrobe;blackRhino];name] $env[animals;blackRhino;$env[userWardrobe;blackRhino];emoji]",
          "$env[animals;demonPufferfish;$env[userWardrobe;demonPufferfish];name] $env[animals;demonPufferfish;$env[userWardrobe;demonPufferfish];emoji]",
          "$env[animals;lavaToucan;$env[userWardrobe;lavaToucan];name] $env[animals;lavaToucan;$env[userWardrobe;lavaToucan];emoji]"\\],
    
        "thumbnail": [
          "$env[animals;whiteGiraffeFamily;$env[userWardrobe;whiteGiraffeFamily];img]",
          "$env[animals;whiteGiraffe;$env[userWardrobe;whiteGiraffe];img]",
          "$env[animals;blackRhino;$env[userWardrobe;blackRhino];img]",
          "$env[animals;demonPufferfish;$env[userWardrobe;demonPufferfish];img]",
          "$env[animals;lavaToucan;$env[userWardrobe;lavaToucan];img]"
        \\],
    
        "color": "452591"
      },
  
      "category_4": {
        "content": [
          "$env[animals;blackTiger;$env[userWardrobe;blackTiger];name] $env[animals;blackTiger;$env[userWardrobe;blackTiger];emoji]",
          "$env[animals;blackBear;$env[userWardrobe;blackBear];name] $env[animals;blackBear;$env[userWardrobe;blackBear];emoji]",
          "$env[animals;aquaYeti;$env[userWardrobe;aquaYeti];name] $env[animals;aquaYeti;$env[userWardrobe;aquaYeti];emoji]",
          "$env[animals;predator;$env[userWardrobe;predator];name] $env[animals;predator;$env[userWardrobe;predator];emoji]",
          "$env[animals;goldenEagle;$env[userWardrobe;goldenEagle];name] $env[animals;goldenEagle;$env[userWardrobe;goldenEagle];emoji]",
          "$env[animals;whiteRhino;$env[userWardrobe;whiteRhino];name] $env[animals;whiteRhino;$env[userWardrobe;whiteRhino];emoji]",
          "$env[animals;blackLionCub;$env[userWardrobe;blackLionCub];name] $env[animals;blackLionCub;$env[userWardrobe;blackLionCub];emoji]",
          "$env[animals;blackLioness;$env[userWardrobe;blackLioness];name] $env[animals;blackLioness;$env[userWardrobe;blackLioness];emoji]",
          "$env[animals;blackLion;$env[userWardrobe;blackLion];name] $env[animals;blackLion;$env[userWardrobe;blackLion];emoji]",
          "$env[animals;muskDeer;$env[userWardrobe;muskDeer];name] $env[animals;muskDeer;$env[userWardrobe;muskDeer];emoji]",
          "$env[animals;stinkyPig;$env[userWardrobe;stinkyPig];name] $env[animals;stinkyPig;$env[userWardrobe;stinkyPig];emoji]"
        \\],
  
        "thumbnail": [
          "$env[animals;blackTiger;$env[userWardrobe;blackTiger];img]",
          "$env[animals;blackBear;$env[userWardrobe;blackBear];img]",
          "$env[animals;aquaYeti;$env[userWardrobe;aquaYeti];img]",
          "$env[animals;predator;$env[userWardrobe;predator];img]",
          "$env[animals;goldenEagle;$env[userWardrobe;goldenEagle];img]",
          "$env[animals;whiteRhino;$env[userWardrobe;whiteRhino];img]",
          "$env[animals;blackLionCub;$env[userWardrobe;blackLionCub];img]",
          "$env[animals;blackLioness;$env[userWardrobe;blackLioness];img]",
          "$env[animals;blackLion;$env[userWardrobe;blackLion];img]",
          "$env[animals;muskDeer;$env[userWardrobe;muskDeer];img]",
          "$env[animals;stinkyPig;$env[userWardrobe;stinkyPig];img]"
        \\],
  
        "color": "750e0e"
      },
  
      "category_3": {
        "content": [
          "$env[animals;girabie;$env[userWardrobe;girabie];name] $env[animals;girabie;$env[userWardrobe;girabie];emoji]",
          "$env[animals;jackass;$env[userWardrobe;jackass];name] $env[animals;jackass;$env[userWardrobe;jackass];emoji]",
          "$env[animals;bigGoat;$env[userWardrobe;bigGoat];name] $env[animals;bigGoat;$env[userWardrobe;bigGoat];emoji]",
          "$env[animals;whiteLionCub;$env[userWardrobe;whiteLionCub];name] $env[animals;whiteLionCub;$env[userWardrobe;whiteLionCub];emoji]",
          "$env[animals;whiteLioness;$env[userWardrobe;whiteLioness];name] $env[animals;whiteLioness;$env[userWardrobe;whiteLioness];emoji]",
          "$env[animals;whiteLion;$env[userWardrobe;whiteLion];name] $env[animals;whiteLion;$env[userWardrobe;whiteLion];emoji]",
          "$env[animals;whiteTiger;$env[userWardrobe;whiteTiger];name] $env[animals;whiteTiger;$env[userWardrobe;whiteTiger];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;girabie;$env[userWardrobe;girabie];img]",
          "$env[animals;jackass;$env[userWardrobe;jackass];img]",
          "$env[animals;bigGoat;$env[userWardrobe;bigGoat];img]",
          "$env[animals;whiteLionCub;$env[userWardrobe;whiteLionCub];img]",
          "$env[animals;whiteLioness;$env[userWardrobe;whiteLioness];img]",
          "$env[animals;whiteLion;$env[userWardrobe;whiteLion];img]",
          "$env[animals;whiteTiger;$env[userWardrobe;whiteTiger];img]"
        \\],
        "color": "ffffff"
      },

      "category_2": {
        "content": [
          "$env[animals;goldenPheasant;$env[userWardrobe;goldenPheasant];name] $env[animals;goldenPheasant;$env[userWardrobe;goldenPheasant];emoji]",
          "$env[animals;momaffieFamily;$env[userWardrobe;momaffieFamily];name] $env[animals;momaffieFamily;$env[userWardrobe;momaffieFamily];emoji]",
          "$env[animals;momaffie;$env[userWardrobe;momaffie];name] $env[animals;momaffie;$env[userWardrobe;momaffie];emoji]",
          "$env[animals;marshDeer;$env[userWardrobe;marshDeer];name] $env[animals;marshDeer;$env[userWardrobe;marshDeer];emoji]",
          "$env[animals;pinkyPig;$env[userWardrobe;pinkyPig];name] $env[animals;pinkyPig;$env[userWardrobe;pinkyPig];emoji]",
          "$env[animals;whiteDove;$env[userWardrobe;whiteDove];name] $env[animals;whiteDove;$env[userWardrobe;whiteDove];emoji]",
          "$env[animals;blackManedLion;$env[userWardrobe;blackManedLion];name] $env[animals;blackManedLion;$env[userWardrobe;blackManedLion];emoji]",
          "$env[animals;lionCub;$env[userWardrobe;lionCub];name] $env[animals;lionCub;$env[userWardrobe;lionCub];emoji]",
          "$env[animals;blackPanther;$env[userWardrobe;blackPanther];name] $env[animals;blackPanther;$env[userWardrobe;blackPanther];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;goldenPheasant;$env[userWardrobe;goldenPheasant];img]",
          "$env[animals;momaffieFamily;$env[userWardrobe;momaffieFamily];img]",
          "$env[animals;momaffie;$env[userWardrobe;momaffie];img]",
          "$env[animals;marshDeer;$env[userWardrobe;marshDeer];img]",
          "$env[animals;pinkyPig;$env[userWardrobe;pinkyPig];img]",
          "$env[animals;whiteDove;$env[userWardrobe;whiteDove];img]",
          "$env[animals;blackManedLion;$env[userWardrobe;blackManedLion];img]",
          "$env[animals;lionCub;$env[userWardrobe;lionCub];img]",
          "$env[animals;blackPanther;$env[userWardrobe;blackPanther];img]"
        \\],
        "color": "f3ab0f"
      },

      "category_1": {
        "content": [
          "$env[animals;fieryToucan;$env[userWardrobe;fieryToucan];name] $env[animals;fieryToucan;$env[userWardrobe;fieryToucan];emoji]",
          "$env[animals;leopard;$env[userWardrobe;leopard];name] $env[animals;leopard;$env[userWardrobe;leopard];emoji]",
          "$env[animals;jaguar;$env[userWardrobe;jaguar];name] $env[animals;jaguar;$env[userWardrobe;jaguar];emoji]",
          "$env[animals;doe;$env[userWardrobe;doe];name] $env[animals;doe;$env[userWardrobe;doe];emoji]",
          "$env[animals;lioness;$env[userWardrobe;lioness];name] $env[animals;lioness;$env[userWardrobe;lioness];emoji]",
          "$env[animals;yellowPufferfish;$env[userWardrobe;yellowPufferfish];name] $env[animals;yellowPufferfish;$env[userWardrobe;yellowPufferfish];emoji]",
          "$env[animals;blueMacaw;$env[userWardrobe;blueMacaw];name] $env[animals;blueMacaw;$env[userWardrobe;blueMacaw];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;fieryToucan;$env[userWardrobe;fieryToucan];img]",
          "$env[animals;leopard;$env[userWardrobe;leopard];img]",
          "$env[animals;jaguar;$env[userWardrobe;jaguar];img]",
          "$env[animals;doe;$env[userWardrobe;doe];img]",
          "$env[animals;lioness;$env[userWardrobe;lioness];img]",
          "$env[animals;yellowPufferfish;$env[userWardrobe;yellowPufferfish];img]",
          "$env[animals;blueMacaw;$env[userWardrobe;blueMacaw];img]"
        \\],
        "color": "ffff00"
      },

      "category_0": {
        "content": [
          "$env[animals;chocoToucan;$env[userWardrobe;chocoToucan];name] $env[animals;chocoToucan;$env[userWardrobe;chocoToucan];emoji]",
          "$env[animals;keelBilledToucan;$env[userWardrobe;keelBilledToucan];name] $env[animals;keelBilledToucan;$env[userWardrobe;keelBilledToucan];emoji]",
          "$env[animals;markhor;$env[userWardrobe;markhor];name] $env[animals;markhor;$env[userWardrobe;markhor];emoji]"
        \\],
        "thumbnail": [
          "$env[animals;chocoToucan;$env[userWardrobe;chocoToucan];img]",
          "$env[animals;keelBilledToucan;$env[userWardrobe;keelBilledToucan];img]",
          "$env[animals;markhor;$env[userWardrobe;markhor];img]"
        \\],
        "color": "c0c0c0"
      }
  
  }]`
  })
  
  