"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ========== IMPORTS ==========
const forge_topgg_1 = require("@tryforge/forge.topgg");
const forgescript_1 = require("@tryforge/forgescript");
const forge_db_1 = require("@tryforge/forge.db");
const forge_canvas_1 = require("@tryforge/forge.canvas");
const forge_regex_1 = require("forge.regex");
const forge_timers_1 = require("forge.timers");
const forge_json_1 = require("forge.json");
const edge_1 = require("@quoriel/edge");
const shutdownSetup_js_1 = require("./utils/shutdownSetup.js");
const loadVariables_js_1 = require("./utils/loadVariables.js");
const path_1 = __importDefault(require("path"));
process.loadEnvFile();
// ========== EXTENTIONS CONFIGURATION ==========
const FT = new forge_timers_1.ForgeTimers({
    intervalConfig: {
        restoredTicksLimit: 0
    },
    cronConfig: {
        restoredTicksLimit: 1
    },
    events: [forge_timers_1.TimerEvent.timerDrop, forge_timers_1.TimerEvent.timersReady, forge_timers_1.TimerEvent.databaseFail]
});
const QE = new edge_1.QuorielEdge({
    features: ["jsonDirectPass", "restArgSpread"],
    events: ["interactionCreate"],
    caches: ["animals", "rares", "locale", "arena", "leaderboard"]
});
const TOP = new forge_topgg_1.ForgeTopGG({
    token: process.env.TOPTOKEN,
    auth: process.env.TOPAUTH,
    events: ["error", "posted", "voted"],
    port: 1040,
    post: {
        interval: 3_600_000
    }
});
const DB = new forge_db_1.ForgeDB({
    events: ["connect"],
    type: "better-sqlite3"
});
// ========== CLIENT CONFIGURATION ==========
forgescript_1.FunctionManager.load(path_1.default.resolve(process.cwd(), "dist", "functions", "native")); // Native functions loader
const BOT = new forgescript_1.ForgeClient({
    extensions: [DB, TOP, QE, FT, new forge_regex_1.ForgeRegex(), new forge_canvas_1.ForgeCanvas(), new forge_json_1.ForgeJSON()],
    prefixes: ["$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]"],
    logLevel: forgescript_1.LogPriority.High,
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
        "MessageContent"
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
        "presenceUpdate"
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
    ]
});
// ========== LOAD VARIABLES ==========
DB.variables(loadVariables_js_1.variables);
// ========== LOAD CUSTOM FUNCTIONS & COMMAND HANDLERS ==========
BOT.functions.load("dist/functions/custom");
BOT.functions.load("dist/handlers/");
// ========== LOAD SLASH COMMANDS ==========
BOT.applicationCommands.load("dist/commands/");
// ========== LOAD EVENTS ==========
BOT.commands.load("dist/events/ForgeScript/");
TOP.commands.load("dist/events/ForgeTopGG/");
DB.commands.load("dist/events/ForgeDB/");
QE.commands.load("dist/events/QuorielEdge/");
FT.commands.load("dist/events/ForgeTimers/");
// ========== SIGNALS handler ==========
(0, shutdownSetup_js_1.shutdownSetup)(BOT);
// ========== LOGIN ==========
BOT.login();
//# sourceMappingURL=index.js.map