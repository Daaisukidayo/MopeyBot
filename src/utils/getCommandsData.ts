import { join } from "path"
import { readFileSync } from "fs"

export type Locales = {
  "en-US": string
  ru: string
}
export type AllLocales = Locales & {
  default: string
}

type LocalesPropArray = Record<keyof Locales, string[]>

export type CommandDetailedNames = Locales
export type SlashCommandName = AllLocales
export type SlashCommandDescription = AllLocales
export type SlashCommandOptionName = AllLocales
export type SlashCommandOptionDescription = AllLocales
export type SlashCommandOptionChoiceName = AllLocales

export interface SlashCommandOptionChoice {
  name: SlashCommandOptionChoiceName
}

export interface SlashCommandOption {
  name: SlashCommandOptionName
  description: SlashCommandOptionDescription
  choices: SlashCommandOptionChoice[]
}

export interface SlashCommandInfo {
  name: SlashCommandName
  description: SlashCommandDescription
  options: SlashCommandOption[]
}

export interface commandInfo {
  [p: string]: {
    name: string
    aliases: string[]
    detailedName: CommandDetailedNames
    slash: SlashCommandInfo
    description: LocalesPropArray
    related: string[]
    category: number
  }
}

const filePath: string = join(process.cwd(), "res/data/commandsData.json")
export const commandsData = JSON.parse(readFileSync(filePath, "utf8")) as commandInfo
