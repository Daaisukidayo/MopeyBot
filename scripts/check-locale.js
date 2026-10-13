const fs = require("fs")
const path = require("path")

const root = path.resolve(__dirname, "..")
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"))
const main = read("res/config/core/main.json")
const languages = Object.keys(main.allLocales)
const endings = main.endingsMap

const locales = { ui: read("res/locale/ui.json"), data: read("res/locale/data.json") }
const isText = (v) => v !== null && typeof v === "object" && !Array.isArray(v) && languages.some((l) => l in v)

const walk = (dir, ext) =>
  fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : []
  })
const sources = [...walk("src", ".ts"), ...walk("res/config", ".json")].map((file) => ({
  file,
  text: fs.readFileSync(path.join(root, file), "utf8")
}))

const errors = []
const warnings = []
const used = new Set()
const builtKeys = new Set()

function tlPath(text, start) {
  let depth = 0
  let part = ""
  const parts = []
  for (let i = start; i < text.length; i++) {
    const c = text[i]
    if (c === "\\") {
      part += c + (text[i + 1] ?? "")
      i++
      continue
    }
    if (depth === 0 && (c === ";" || c === "]")) break
    if (c === "[") depth++
    if (c === "]") depth--
    if (c === "." && depth === 0) {
      parts.push(part)
      part = ""
    } else part += c
  }
  parts.push(part)
  return parts
}

const resolve = (file, keys) => keys.reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), locales[file])

for (const { file, text } of sources) {
  for (let i = text.indexOf("$tl["); i !== -1; i = text.indexOf("$tl[", i + 4)) {
    const parts = tlPath(text, i + 4)
    const where = `${file}:${text.slice(0, i).split("\n").length}`
    const [locale, ...rest] = parts
    if (!(locale in locales)) {
      if (!locale.includes("$")) errors.push(`${where}: unknown locale file '${locale}' in $tl[${parts.join(".")}]`)
      continue
    }
    const keys = rest.slice(0, -1)
    const dynamic = keys.findIndex((k) => k.includes("$"))

    if (dynamic === -1) {
      const value = resolve(locale, keys)
      const key = `${locale}.${keys.join(".")}`
      if (!isText(value)) errors.push(`${where}: no text '${key}'`)
      else used.add(key)
      continue
    }

    const prefix = keys.slice(0, dynamic)
    if (prefix.length && typeof resolve(locale, prefix) !== "object") {
      errors.push(`${where}: no group '${[locale, ...prefix].join(".")}' for $tl[${parts.join(".")}]`)
      continue
    }
    builtKeys.add({ locale, patterns: keys.map(segmentPattern) })
  }
}

function segmentPattern(segment) {
  let pattern = ""
  for (let i = 0; i < segment.length; i++) {
    if (segment[i] !== "$") {
      pattern += segment[i].replace(/[.*+?^{}()|[\]\\]/g, "\\$&")
      continue
    }
    while (i + 1 < segment.length && /[\w!]/.test(segment[i + 1])) i++
    if (segment[i + 1] === "[") {
      let depth = 0
      for (i++; i < segment.length; i++) {
        if (segment[i] === "[") depth++
        if (segment[i] === "]" && --depth === 0) break
      }
    }
    pattern += ".*"
  }
  return new RegExp(`^${pattern}$`)
}
const underBuiltKey = (key) => {
  const [locale, ...parts] = key.split(".")
  return [...builtKeys].some(
    (built) =>
      built.locale === locale &&
      built.patterns.length === parts.length &&
      built.patterns.every((pattern, i) => pattern.test(parts[i]))
  )
}

const texts = []
const collect = (value, keyPath) => {
  if (isText(value)) return texts.push([keyPath, value])
  if (value && typeof value === "object" && !Array.isArray(value))
    for (const [k, v] of Object.entries(value)) collect(v, `${keyPath}.${k}`)
}
for (const [locale, value] of Object.entries(locales)) collect(value, locale)

const placeholders = (value) =>
  [
    ...new Set(
      []
        .concat(value)
        .join("\n")
        .match(/\{\d+(?=[}:])/g) ?? []
    )
  ]
    .map((p) => p.slice(1))
    .sort()
    .join(",")

for (const [key, value] of texts) {
  for (const language of languages) {
    if (value[language] === undefined || value[language] === "") errors.push(`${key}: no '${language}' text`)
    for (const [, ending] of []
      .concat(value[language] ?? [])
      .join("\n")
      .matchAll(/\{\d+:([a-z]+)\}/g)) {
      if (ending !== "ord" && !endings[language]?.[ending])
        errors.push(`${key}: '${language}' uses the plural ending '${ending}', missing in endingsMap.${language}`)
    }
  }
  const found = new Set(languages.filter((l) => value[l] !== undefined).map((l) => placeholders(value[l])))
  if (found.size > 1) warnings.push(`${key}: the languages use different placeholders`)
}

const everything = sources.map((s) => s.text).join("\n")
const groups = [...new Set(everything.match(/\b(?:ui|data)(?:\.[A-Za-z0-9_-]+)+(?![.\w$])/g) ?? [])].filter(
  (mention) => {
    const [file, ...keys] = mention.split(".")
    const value = resolve(file, keys)
    return value && typeof value === "object" && !isText(value)
  }
)
const unused = texts
  .map(([key]) => key)
  .filter(
    (key) =>
      !used.has(key) && !underBuiltKey(key) && !everything.includes(key) && !groups.some((g) => key.startsWith(g + "."))
  )
if (unused.length) warnings.push(`${unused.length} texts look unused:\n    ${unused.join("\n    ")}`)

for (const error of errors) console.log(`error: ${error}`)
for (const warning of warnings) console.log(`warning: ${warning}`)
console.log(`Locale: ${texts.length} texts checked, ${errors.length} errors, ${warnings.length} warnings`)
process.exitCode = errors.length ? 1 : 0
