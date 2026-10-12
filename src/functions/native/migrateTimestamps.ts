import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, RecordData } from "@tryforge/forge.db/dist/util"
import fs from "fs"
import path from "path"
import { timestampsToNumbers } from "../../utils/timestampsMigration"

export default new NativeFunction({
  name: "$migrateTimestamps",
  description:
    "Moves the saved end dates of the challenge history from text to numbers. The old values of the changed records are saved to database/ first. Returns how many records changed",
  unwrap: false,
  output: ArgType.Number,
  async execute() {
    const changed = []
    for (const record of await DataBase.getAll()) {
      if (typeof record.value !== "string") continue
      const value = timestampsToNumbers(record.value)
      if (value !== record.value) changed.push({ record, value })
    }
    if (changed.length === 0) return this.success(0)

    const dir = path.join(process.cwd(), "database")
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, `timestamps-backup-${Date.now()}.json`),
      JSON.stringify(
        changed.map((c) => c.record),
        null,
        2
      )
    )

    for (const { record, value } of changed) await DataBase.set({ ...record, value } as RecordData)
    return this.success(changed.length)
  }
})
