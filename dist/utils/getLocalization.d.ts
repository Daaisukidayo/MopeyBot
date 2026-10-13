import type { AllLocales, Locales } from "./getCommandsData.js";
type LocalizationResult = {
    name: string;
    name_localizations: Locales;
};
export declare function getLocalization(locObj: AllLocales): LocalizationResult;
export declare function localized(entry: {
    name: AllLocales;
    description: AllLocales;
}): LocalizationResult & {
    description: string;
    description_localizations: Locales;
};
export declare function localized(entry: {
    name: AllLocales;
}): LocalizationResult;
export {};
//# sourceMappingURL=getLocalization.d.ts.map