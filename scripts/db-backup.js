// Copies the bot's databases to database/backups, named with the date and time.
// Uses SQLite's online backup, so the copy is whole even while the bot is running.
const fs = require("fs")
const path = require("path")
const Database = require("better-sqlite3")

const root = path.resolve(__dirname, "..")
const dir = path.join(root, "database")
const backups = path.join(dir, "backups")

const stamp = new Date().toISOString().slice(0, 19).replace("T", "_").replace(/:/g, "-")

;(async () => {
  fs.mkdirSync(backups, { recursive: true })
  let copied = 0
  for (const name of ["forge", "timers"]) {
    const source = path.join(dir, `${name}.db`)
    if (!fs.existsSync(source)) {
      console.log(`${name}.db: not found, skipped`)
      continue
    }
    const target = path.join(backups, `${name}-${stamp}.db`)
    const db = new Database(source, { readonly: true })
    await db.backup(target)
    db.close()
    console.log(`${name}.db -> ${path.relative(root, target)} (${(fs.statSync(target).size / 1024).toFixed(0)} KB)`)
    copied++
  }
  if (!copied) process.exitCode = 1
})().catch((e) => {
  console.error("Backup failed:", e.message)
  process.exitCode = 1
})
