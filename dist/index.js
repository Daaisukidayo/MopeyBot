"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ========== IMPORTS ==========
const forge_topgg_1 = require("@tryforge/forge.topgg");
const forgescript_1 = require("@tryforge/forgescript");
const forge_db_1 = require("@tryforge/forge.db");
const forge_regex_1 = require("forge.regex");
const shutdownSetup_js_1 = require("./utils/shutdownSetup.js");
const loadVariables_js_1 = require("./utils/loadVariables.js");
const forge_canvas_1 = require("@tryforge/forge.canvas");
// @ts-ignore - No type declaration available for @quoriel/edge
const edge_1 = require("@quoriel/edge");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
// ========== EXTENTIONS CONFIGURATION ==========
const TOP = new forge_topgg_1.ForgeTopGG({
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
});
const DB = new forge_db_1.ForgeDB({
    events: ["connect"],
    type: 'better-sqlite3',
});
// ========== CLIENT CONFIGURATION ==========
const BOT = new forgescript_1.ForgeClient({
    extensions: [
        DB,
        TOP,
        new forge_regex_1.ForgeRegex(),
        new edge_1.QuorielEdge(),
        new forge_canvas_1.ForgeCanvas(),
    ],
    intents: [
        "Guilds",
        "GuildMessages",
        "DirectMessages",
        "MessageContent",
    ],
    prefixes: [
        "$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]",
    ],
    logLevel: forgescript_1.LogPriority.Low,
    token: process.env.TOKEN,
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
});
// ========== LOAD VARIABLES ==========
DB.variables(loadVariables_js_1.variables);
// ========== LOAD FUNCTIONS & COMMAND HANDLERS ==========
BOT.functions.load("dist/functions/");
BOT.functions.load("dist/handlers/");
// ========== LOAD SLASH COMMANDS ==========
BOT.applicationCommands.load("dist/commands/");
// ========== LOAD EVENTS ==========
BOT.commands.load("dist/events/ForgeScript/");
TOP.commands.load("dist/events/ForgeTopGG/");
DB.commands.load("dist/events/ForgeDB/");
// ========== SIGNALS handler ==========
(0, shutdownSetup_js_1.shutdownSetup)(BOT);
// ========== LOGIN ==========
BOT.login();
//# sourceMappingURL=index.js.map