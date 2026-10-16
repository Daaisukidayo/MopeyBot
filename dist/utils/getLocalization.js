"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalization = getLocalization;
exports.localized = localized;
function getLocalization(locObj) {
    return {
        name: locObj["default"],
        name_localizations: {
            "en-US": locObj["en-US"],
            ru: locObj["ru"],
        },
    };
}
function localized(entry) {
    const name = getLocalization(entry.name);
    if (!entry.description)
        return name;
    const description = getLocalization(entry.description);
    return { ...name, description: description.name, description_localizations: description.name_localizations };
}
//# sourceMappingURL=getLocalization.js.map