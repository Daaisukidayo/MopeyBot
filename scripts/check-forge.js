const fs = require("fs")
const path = require("path")
const { FunctionManager, ForgeFunction, Compiler, Logger } = require("@tryforge/forgescript")
const { ClassManager, ForgeClassBuilder } = require("forge.class")

const root = path.resolve(__dirname, "..")
const dist = path.join(root, "dist")

const walk = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name)
        return e.isDirectory() ? walk(p) : p.endsWith(".js") ? [p] : []
      })
    : []
const exportsOf = (file) => [].concat(require(file).default ?? [])

const warn = Logger.warn
Logger.warn = () => {}
FunctionManager.load("MopeyBot", path.join(dist, "functions", "native"))
for (const [name, dir] of [
  ["ForgeDB", "node_modules/@tryforge/forge.db/dist/functions"],
  ["ForgeTopGG", "node_modules/@tryforge/forge.topgg/dist/native"],
  ["QuorielEdge", "node_modules/@quoriel/edge/src/functions"],
  ["ForgeTimers", "node_modules/forge.timers/dist/native"],
  ["ForgeRegex", "node_modules/forge.regex/dist/native"],
  ["ForgeCanvas", "node_modules/@tryforge/forge.canvas/dist/functions"],
  ["ForgeJSON", "node_modules/forge.json/dist/native"],
  ["ForgeClass", "node_modules/forge.class/dist/native"],
]) {
  FunctionManager.load(name, path.join(root, dir))
}
FunctionManager.loadNative()
Logger.warn = warn

const customFiles = [...walk(path.join(dist, "functions", "custom")), ...walk(path.join(dist, "handlers"))]
for (const file of customFiles) for (const fn of exportsOf(file)) if (fn instanceof ForgeFunction) fn.populate()

const files = ["commands", "events", "handlers", path.join("functions", "custom"), "classes"].flatMap((d) =>
  walk(path.join(dist, d))
)
// Every string in a field default is code, even inside an array or object
const stringsIn = (value) =>
  typeof value === "string"
    ? [value]
    : value && typeof value === "object"
      ? Object.values(value).flatMap(stringsIn)
      : []
// A class has a code for every field default and method
const codesOf = (item) => {
  const cls = item instanceof ForgeClassBuilder ? item.data : item?.methods || item?.fields ? item : null
  if (!cls) return [item?.data?.code ?? item?.options?.code].filter((code) => typeof code === "string")
  return [...stringsIn(cls.fields ?? {}), ...Object.values(cls.methods ?? {}).map((m) => m.code ?? m)]
}
// A local function called with fewer args than its params compiles, and fails only when the call runs
const calledShort = (compiled) => {
  const all = []
  const collect = (fns) => {
    for (const { data } of fns ?? []) {
      all.push(data)
      for (const field of data.fields ?? []) collect(field.functions)
    }
  }
  collect(compiled.functions)
  // A name built at run time can't be checked
  const nameOf = (data) => (data.fields?.[0]?.functions?.length ? null : data.fields?.[0]?.value)
  const params = new Map(
    all.filter((f) => f.name === "$localFunction" && nameOf(f)).map((f) => [nameOf(f), f.fields.length - 2])
  )
  return all
    .filter((f) => f.name === "$callLocalFunction" && f.fields.length - 1 < (params.get(nameOf(f)) ?? 0))
    .map((f) => `$callFn[${nameOf(f)}] needs ${params.get(nameOf(f))} args, gets ${f.fields.length - 1}`)
}
let codes = 0
const errors = []
const report = (file, error, code) => {
  const message = String(error.message).replace(/[*`]/g, "")
  const at = message.match(/at (\d+):(\d+)/)
  const line = at && code ? code.split("\n")[Number(at[1]) - 1]?.trim() : ""
  const source = path.relative(root, file).replace(/^dist/, "src").replace(/\.js$/, ".ts")
  errors.push(`${source}: ${message.split(" at ")[0]}${line ? `\n    ${line.slice(0, 140)}` : ""}`)
}

for (const file of files) {
  let items
  try {
    items = exportsOf(file)
  } catch (e) {
    codes++
    report(file, e)
    continue
  }

  for (const item of items) {
    for (const code of codesOf(item)) {
      codes++
      try {
        for (const problem of calledShort(Compiler.compile(code))) report(file, new Error(problem))
      } catch (e) {
        report(file, e, code)
      }
    }
  }
}

// The classes are added as the bot adds them: their params, parents and names are checked too
const classesDir = path.join(dist, "classes")
try {
  if (fs.existsSync(classesDir)) new ClassManager().load(classesDir)
} catch (e) {
  report(classesDir, e)
}

for (const error of errors) console.log(error)
console.log(`ForgeScript: ${codes} codes compiled, ${errors.length} with errors`)
process.exitCode = errors.length ? 1 : 0
