"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalIdsMigrator = animalIdsMigrator;
function animalIdsMigrator(renames, skins) {
    const quoted = new RegExp(`(?<!\\\\)"(${Object.keys(renames).join("|")})"`, "g");
    return (name, value) => {
        if (Object.hasOwn(renames, value))
            return renames[value];
        const text = value.replace(quoted, (_, id) => `"${renames[id]}"`);
        return name === "userWardrobe" ? wardrobeToSkinIds(text, skins) : text;
    };
}
function wardrobeToSkinIds(text, skins) {
    let wardrobe;
    try {
        wardrobe = JSON.parse(text);
    }
    catch {
        return text;
    }
    if (!wardrobe || typeof wardrobe !== "object" || Array.isArray(wardrobe))
        return text;
    const isSkinOf = (animal, skin) => skins[animal]?.some((s) => s.id === skin) ?? false;
    const entries = Object.entries(wardrobe);
    if (entries.every(([animal, skin]) => isSkinOf(animal, skin)))
        return text;
    const next = {};
    for (const [animal, skin] of entries) {
        const isIndex = typeof skin === "number" || (typeof skin === "string" && /^\d+$/.test(skin));
        const id = isIndex ? skins[animal]?.[Number(skin)]?.id : isSkinOf(animal, skin) ? skin : undefined;
        if (id)
            next[animal] = id;
    }
    return JSON.stringify(next);
}
//# sourceMappingURL=animalIdsMigration.js.map