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
  author: "$author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]",
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
  prefix: ".",
  emoji: "🪙",
  defaultColor: "#FFD700",
  errorColor: "#D0321D",
  luckyColor: "#228B22",
  cooldownColor: "#7303b7",
  logColor: "#2019b3",
  blank: "<:blank:898514292926713866>",

  catchedRareCategories: {
    inferno: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    default: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    medium: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    hard: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    insane: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    impossible: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },

  raretryVarData: {
    coinsForRaretry: {
      inferno: [0, 0, 0, 0, 0, 100, 110, 120, 130, 140],
      other: [0, 0, 500, 1500, 4000, 10500, 55000, 165000, 275000, 550000, 1375000, 2750000, 5500000, 55000000]
    },

    chancesForRaretry: {
      inferno: [1, 2, 3, 4, 5, 10, 15, 20, 25, 30],
      other: [3, 5, 10, 30, 75, 200, 1000, 3000, 5000, 10000, 25000, 50000, 100000, 1000000],
    },

    categories: ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Extreme", "Godly", "Mythic", "Ultra", "USSR"],
    raretryModes: ["Inferno", "Default", "Medium", "Hard", "Insane", "Impossible"],

    multipliersForRaretry: [1, 1.25, 1.5, 1.75, 2],
  },

  userPacks: {
    summerSP: false,
    halloweenSP: false,
    goldenSP: false,
    lockedSP: false,
    storefrontSP: false,
    legacySP: false,
    landGTSP: false,
    desertGTSP: false,
    arcticGTSP: false,
    oceanGTSP: false,
  },
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

// Function for adding coins

client.functions.add({
  name: "sumMC",
  params: ["amount"],
  code: `$return[$setUserVar[MC;$sum[$getUserVar[MC];$env[amount]]]]`
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
    $if[$getUserVar[dev]==false;
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
