import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { DataBase } from "@tryforge/forge.db/dist/util"

// parse saved values as JSON when they are. numbers too big for JS (Discord IDs) keep their exact digits
function parseValue(text: string): unknown {
  try {
    return JSON.parse(text, (_key, value, context?: { source: string }) =>
      typeof value === "number" && !Number.isSafeInteger(value) && context
        ? (JSON as unknown as { rawJSON(text: string): unknown }).rawJSON(context.source)
        : value
    )
  } catch {
    return text
  }
}

export default new NativeFunction({
  name: "$userRecords",
  description: "every saved var of a user as formatted JSON: user vars by name, the rest by type and server",
  brackets: true,
  unwrap: true,
  output: ArgType.String,
  args: [
    {
      name: "user ID",
      description: "whose vars to return",
      type: ArgType.String,
      required: true,
      rest: false,
    },
  ],
  async execute(ctx, [userId]) {
    const result: Record<string, any> = {}
    for (const record of await DataBase.getAll()) {
      if (record.id !== userId) continue
      const value = typeof record.value === "string" ? parseValue(record.value) : record.value
      if (record.type === "user") result[record.name] = value
      else ((result[record.type] ??= {})[record.guildId || "-"] ??= {})[record.name] = value
    }
    return this.success(JSON.stringify(result, null, 2))
  },
})
