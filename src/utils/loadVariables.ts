import fs from "fs"
import path from "path"

const varsPath = ["res", "config"]

export function readVariables(): Record<string, unknown> {
  const root = path.join(process.cwd(), ...varsPath)
  const variables: Record<string, unknown> = {}

  const files = fs.readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    if (!entry.isDirectory()) return [entry.name]
    if (entry.name.startsWith("_") || entry.name.startsWith(".")) return []
    return fs.readdirSync(path.join(root, entry.name)).map((file) => `${entry.name}/${file}`)
  })

  for (const file of files.filter((f) => f.endsWith(".json"))) {
    const where = varsPath.join("/") + `/${file}`
    let data: unknown
    try {
      data = JSON.parse(fs.readFileSync(path.join(root, file), "utf-8"))
    } catch (err) {
      throw new Error(`${where}: ${(err as Error).message}`, { cause: err })
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error(`${where} must be a JSON object`)

    for (const [key, value] of Object.entries(data)) {
      if (Object.hasOwn(variables, key)) throw new Error(`Variable "${key}" in ${where} is already defined`)
      variables[key] = value
    }
  }
  return variables
}

export const variables = readVariables()
