// ========== IMPORTS ==========

import { ForgeTopGG } from "@tryforge/forge.topgg"
import { ForgeClient, LogPriority } from "@tryforge/forgescript"
import { ForgeDB } from "@tryforge/forge.db"
import { ForgeCanvas } from "@tryforge/forge.canvas"

import { shutdownSetup } from "./src/scripts/shutdownSetup.js"
import { allVariables } from "./variables/allVariables.js"
import dotenv from "dotenv"
dotenv.config()

// ========== CLIENT CONFIGURATION ==========

const CV = new ForgeCanvas()

const TOP = new ForgeTopGG({
  token: process.env.TOPTOKEN,
  auth: process.env.TOPAUTH,
  events: [
    "error",
    "posted",
    "voted"
  ],
  port: 9030,
  post: { interval: 3_600_000 }
})

const DB = new ForgeDB({
  events: ["connect"],
  type: 'better-sqlite3',
})

const BOT = new ForgeClient({
  extensions: [
    DB,
    TOP,
    CV,
  ],

  intents: [
    "Guilds",
    "GuildMessages",
    "GuildMembers",
    "DirectMessages",
    "MessageContent",
  ],

  events: [
    "interactionCreate", 
    "messageCreate", 
    "clientReady",
    "userUpdate"
  ],

  prefixes: [
    "$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]",
  ],

  logLevel: LogPriority.Medium,
})

// ========== LOAD COMMANDS ==========
BOT.functions.load("./src/functions")
BOT.commands.load("./src/commands/prefix")
BOT.applicationCommands.load("./src/commands/slash")
TOP.commands.load("./src/commands/topgg")
DB.commands.load("./src/commands/db")

// ========== SIGNALS handler ==========
shutdownSetup(BOT)

// ========== LOGIN ==========
BOT.login(process.env.TOKEN)

// ========== VARIABLES ==========
DB.variables(allVariables)