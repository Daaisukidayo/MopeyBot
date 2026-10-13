export type Locales = {
    "en-US": string;
    ru: string;
};
export type AllLocales = Locales & {
    default: string;
};
type LocalesPropArray = Record<keyof Locales, string[]>;
export type CommandDetailedNames = Locales;
export type SlashCommandName = AllLocales;
export type SlashCommandDescription = AllLocales;
export type SlashCommandOptionName = AllLocales;
export type SlashCommandOptionDescription = AllLocales;
export type SlashCommandOptionChoiceName = AllLocales;
export interface SlashCommandOptionChoice {
    name: SlashCommandOptionChoiceName;
}
export interface SlashCommandOption {
    name: SlashCommandOptionName;
    description: SlashCommandOptionDescription;
    choices: SlashCommandOptionChoice[];
}
export interface SlashCommandInfo {
    name: SlashCommandName;
    description: SlashCommandDescription;
    options: SlashCommandOption[];
}
export interface commandInfo {
    [p: string]: {
        name: string;
        aliases: string[];
        detailedName: CommandDetailedNames;
        slash: SlashCommandInfo;
        description: LocalesPropArray;
        related: string[];
        category: number;
    };
}
export declare const commandsData: commandInfo;
export {};
//# sourceMappingURL=getCommandsData.d.ts.map