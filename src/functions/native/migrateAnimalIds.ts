import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase, RecordData } from "@tryforge/forge.db/dist/util"
import fs from "fs"
import path from "path"
import { animalIdsMigrator } from "../../utils/animalIdsMigration"

export default new NativeFunction({
  name: "$migrateAnimalIds",
  description:
    "Moves every saved record to the mope.io animal IDs and the wardrobes to skin ids. The old values of the changed records are saved to database/ first. Returns how many records changed",
  unwrap: false,
  output: ArgType.Number,
  async execute() {
    const read = (file: string) => JSON.parse(fs.readFileSync(path.join(process.cwd(), file), "utf8"))
    const migrate = animalIdsMigrator(read("res/data/migrations/animalIds.json"), read("res/data/animals/skins.json"))

    const changed = []
    for (const record of await DataBase.getAll()) {
      if (typeof record.value !== "string") continue
      const value = migrate(record.name, record.value)
      if (value !== record.value) changed.push({ record, value })
    }
    if (changed.length === 0) return this.success(0)

    const dir = path.join(process.cwd(), "database")
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, `animal-ids-backup-${Date.now()}.json`),
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
