// ========== IMPORTS ==========
import { ForgeTopGG, IForgeTopGGOptions } from "@tryforge/forge.topgg"
import { ForgeClient, LogPriority } from "@tryforge/forgescript"
import { ForgeDB } from "@tryforge/forge.db"
import { ForgeRegex } from "forge.regex"
import { shutdownSetup } from "./utils/shutdownSetup.js"
import { variables } from "./utils/loadVariables.js"
import { ForgeCanvas } from "@tryforge/forge.canvas"
// @ts-ignore - No type declaration available for @quoriel/edge
import { QuorielEdge } from "@quoriel/edge"

import { configDotenv } from "dotenv" 
configDotenv()

// ========== EXTENTIONS CONFIGURATION ==========
const QE = new QuorielEdge({
  features: [
    "jsonDirectPass"
  ],
  events: [
    "interactionCreate",
  ],
})

const TOP = new ForgeTopGG({
  token: process.env.TOPTOKEN,
  auth: process.env.TOPAUTH,
  events: [
    "error",
    "posted",
    "voted"
  ],
  port: 1040,
  post: { 
    interval: 3_600_000
  }
} as IForgeTopGGOptions)

const DB: ForgeDB = new ForgeDB({
  events: ["connect"],
  type: 'better-sqlite3',
})

// ========== CLIENT CONFIGURATION ==========
const BOT: ForgeClient = new ForgeClient({
  extensions: [
    DB,
    TOP,
    QE,
    new ForgeRegex(),
    new ForgeCanvas(),
  ],

  prefixes: [
    "$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]",
  ],

  logLevel: LogPriority.Low,
  
  token: process.env.TOKEN,

  intents: [
    "Guilds",
    // "GuildMembers",
    // "GuildModeration",
    // "GuildBans",
    // "GuildExpressions",
    // "GuildEmojisAndStickers",
    // "GuildIntegrations",
    // "GuildWebhooks",
    // "GuildInvites",
    // "GuildVoiceStates",
    // "GuildPresences",
    "GuildMessages",
    // "GuildMessageReactions",
    // "GuildMessageTyping",
    "DirectMessages",
    // "DirectMessageReactions",
    // "DirectMessageTyping",
    "MessageContent",
    // "GuildScheduledEvents",
    // "AutoModerationConfiguration",
    // "AutoModerationExecution",
    // "GuildMessagePolls",
    // "DirectMessagePolls"
  ],
  
  events: [
    // "autoModerationActionExecution",
    // "autoModerationRuleCreate",
    // "autoModerationRuleDelete",
    // "autoModerationRuleUpdate",
    // "channelCreate",
    // "channelDelete",
    // "channelPinsUpdate",
    // "channelUpdate",
    "clientReady",
    // "debug",
    // "emojiCreate",
    // "emojiDelete",
    // "emojiUpdate",
    // "entitlementCreate",
    // "entitlementDelete",
    // "entitlementUpdate",
    // "error",
    // "guildAuditLogEntryCreate",
    // "guildAvailable",
    // "guildBanAdd",
    // "guildBanRemove",
    // "guildCreate",
    // "guildDelete",
    // "guildIntegrationsUpdate",
    // "guildMemberAdd",
    // "guildMemberAvailable",
    // "guildMemberRemove",
    // "guildMemberUpdate",
    // "guildScheduledEventCreate",
    // "guildScheduledEventDelete",
    // "guildScheduledEventUpdate",
    // "guildScheduledEventUserAdd",
    // "guildScheduledEventUserRemove",
    // "guildSoundboardSoundCreate",
    // "guildSoundboardSoundDelete",
    // "guildSoundboardSoundUpdate",
    // "guildUnavailable",
    // "guildUpdate",
    "interactionCreate",
    // "inviteCreate",
    // "inviteDelete",
    "messageCreate",
    // "messageDelete",
    // "messageDeleteBulk",
    // "messagePollVoteAdd",
    // "messagePollVoteRemove",
    // "messageReactionAdd",
    // "messageReactionRemove",
    // "messageReactionRemoveAll",
    // "messageReactionRemoveEmoji",
    // "messageUpdate",
    // "presenceUpdate",
    // "roleCreate",
    // "roleDelete",
    // "roleUpdate",
    // "shardDisconnect",
    // "shardError",
    // "shardReady",
    // "shardReconnecting",
    // "shardResume",
    // "stageInstanceCreate",
    // "stageInstanceDelete",
    // "stageInstanceUpdate",
    // "stickerCreate",
    // "stickerDelete",
    // "stickerUpdate",
    // "subscriptionCreate",
    // "subscriptionDelete",
    // "subscriptionUpdate",
    // "threadCreate",
    // "threadDelete",
    // "threadMemberUpdate",
    // "threadUpdate",
    // "typingStart",
    // "userUpdate",
    // "voiceChannelEffectSend",
    // "voiceStateUpdate",
    // "webhooksUpdate"
  ],
})

// ========== LOAD VARIABLES ==========
DB.variables(variables)

// ========== LOAD FUNCTIONS & COMMAND HANDLERS ==========
BOT.functions.load("dist/functions/")
BOT.functions.load("dist/handlers/")

// ========== LOAD SLASH COMMANDS ==========
BOT.applicationCommands.load("dist/commands/")

// ========== LOAD EVENTS ==========
BOT.commands.load("dist/events/ForgeScript/")
TOP.commands.load("dist/events/ForgeTopGG/")
DB.commands.load("dist/events/ForgeDB/")
QE.commands.load("dist/events/QuorielEdge/")

// ========== SIGNALS handler ==========
shutdownSetup(BOT)

// ========== LOGIN ==========
BOT.login()