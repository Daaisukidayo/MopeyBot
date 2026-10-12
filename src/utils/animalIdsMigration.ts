export type Renames = Record<string, string>
export type Skins = Record<string, { id: string }[]>

export function animalIdsMigrator(renames: Renames, skins: Skins) {
  const quoted = new RegExp(`(?<!\\\\)"(${Object.keys(renames).join("|")})"`, "g")

  return (name: string, value: string): string => {
    if (Object.hasOwn(renames, value)) return renames[value]
    const text = value.replace(quoted, (_, id: string) => `"${renames[id]}"`)
    return name === "userWardrobe" ? wardrobeToSkinIds(text, skins) : text
  }
}

function wardrobeToSkinIds(text: string, skins: Skins): string {
  let wardrobe: unknown
  try {
    wardrobe = JSON.parse(text)
  } catch {
    return text
  }
  if (!wardrobe || typeof wardrobe !== "object" || Array.isArray(wardrobe)) return text

  const isSkinOf = (animal: string, skin: unknown) => skins[animal]?.some((s) => s.id === skin) ?? false
  const entries = Object.entries(wardrobe)
  if (entries.every(([animal, skin]) => isSkinOf(animal, skin))) return text

  const next: Record<string, string> = {}
  for (const [animal, skin] of entries) {
    const isIndex = typeof skin === "number" || (typeof skin === "string" && /^\d+$/.test(skin))
    const id = isIndex ? skins[animal]?.[Number(skin)]?.id : isSkinOf(animal, skin) ? (skin as string) : undefined
    if (id) next[animal] = id
  }
  return JSON.stringify(next)
}
