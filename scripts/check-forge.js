const fs = require("fs")
const path = require("path")
const { FunctionManager, ForgeFunction, Compiler, Logger } = require("@tryforge/forgescript")

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
  ["ForgeJSON", "node_modules/forge.json/dist/native"]
]) {
  FunctionManager.load(name, path.join(root, dir))
}
FunctionManager.loadNative()
Logger.warn = warn

const customFiles = [...walk(path.join(dist, "functions", "custom")), ...walk(path.join(dist, "handlers"))]
for (const file of customFiles) for (const fn of exportsOf(file)) if (fn instanceof ForgeFunction) fn.populate()

const files = ["commands", "events", "handlers", path.join("functions", "custom")].flatMap((d) =>
  walk(path.join(dist, d))
)
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
    const code = item?.data?.code ?? item?.options?.code
    if (typeof code !== "string") continue
    codes++
    try {
      Compiler.compile(code)
    } catch (e) {
      report(file, e, code)
    }
  }
}

for (const error of errors) console.log(error)
console.log(`ForgeScript: ${codes} codes compiled, ${errors.length} with errors`)
process.exitCode = errors.length ? 1 : 0
