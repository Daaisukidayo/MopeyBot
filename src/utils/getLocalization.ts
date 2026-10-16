import type { AllLocales, Locales } from "./getCommandsData.js"

type LocalizationResult = {
  name: string
  name_localizations: Locales
}

export function getLocalization(locObj: AllLocales): LocalizationResult {
  return {
    name: locObj["default"],
    name_localizations: {
      "en-US": locObj["en-US"],
      ru: locObj["ru"],
    },
  }
}

export function localized(entry: {
  name: AllLocales
  description: AllLocales
}): LocalizationResult & { description: string; description_localizations: Locales }
export function localized(entry: { name: AllLocales }): LocalizationResult
export function localized(entry: { name: AllLocales; description?: AllLocales }) {
  const name = getLocalization(entry.name)
  if (!entry.description) return name

  const description = getLocalization(entry.description)
  return { ...name, description: description.name, description_localizations: description.name_localizations }
}
