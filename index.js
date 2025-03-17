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
    $setStatus[online;Watching;over $guildCount servers]
    $log[$username[$botID] is online!]
  `
})

// ========== VARIABLES ==========

ForgeDB.variables({
  channel: "1350898919068139652",
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
  onSlowmode: false,
  botEnabled: true,
  isBanned: false,
  dev: false,
  prefix: ".",
  emoji: "🪙",
  acceptedRules: false,
  MC: 0,
  MUID: -1,
  maxID: 0,
  defaultColor: "#FFD700",
  errorColor: "#D0321D",
  luckyColor: "#228B22",
  cooldownColor: "#7303b7",
  logColor: "#2019b3",
  blank: "<:blank:898514292926713866>"
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
    
    $return[
      $author[$userDisplayName • MUID: $getUserVar[MUID];$userAvatar]
      $title[⏰ Cooldown!]
      $description[Cooldown will end $get[relativeTimeLeft] $get[longDateTime]!]
      $color[$getGlobalVar[cooldownColor]]    
      $deleteIn[$if[$or[$get[time]>10000;$get[time]==0]==true;10s;$get[time]]]
    ]
  `
});

// Function for adding coins

client.functions.add({
  name: "sumMC",
  params: ["amount"],
  code: `$return[$setUserVar[MC;$sum[$getUserVar[MC];$env[amount]]]]`
})

// Logging

client.functions.add({
  name: "logSchema",
  params: ["command"],
  code: `
  $return[
    $sendMessage[$getGlobalVar[channel];
      $description[Used: $env[command]]
      $color[$getGlobalVar[logColor]]
      $title[Log]
      $author[$userDisplayName ($authorID) • MUID: $getUserVar[MUID];$userAvatar]
      $if[$guildID!=;$footer[$guildName;$guildIcon]]     
    ]
  ]
  `
})

