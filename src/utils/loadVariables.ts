import fs from "fs"
import path from "path"

const variables: Record<string, any> = {}

function assignVariable(key: string, value: any): void {
  if (Object.hasOwn(variables, key)) {
    throw new Error(`Name collision! Variable "${key}" is already defined.`)
  }
  variables[key] = value
}

((): void => {
  try {
    const configRootPath = path.join(process.cwd(), "res", "config")

    if (!fs.existsSync(configRootPath)) {
      console.warn(`⚠️ Configuration directory not found at: ${configRootPath}`)
      return
    }

    const entries = fs.readdirSync(configRootPath, { withFileTypes: true })

    const dirs = entries
      .filter(entry => entry.isDirectory() && (!entry.name.startsWith('_') || !entry.name.startsWith('.')))
      .map(entry => entry.name)

    if (dirs.length === 0) {
      console.warn("⚠️ No valid sub-directories found in res/config.")
      return
    }

    for (const dir of dirs) {
      const dirPath = path.join(configRootPath, dir)
      
      const allFiles = fs.readdirSync(dirPath)
      const jsonFiles = allFiles.filter(file => file.endsWith(".json"))

      if (jsonFiles.length === 0) {
        console.info(`ℹ️ Skipped empty directory "${dir}"`)
        continue
      }

      for (const file of jsonFiles) {
        const filePath = path.join(dirPath, file)

        try {
          const fileContent = fs.readFileSync(filePath, "utf-8")
          const jsonData = JSON.parse(fileContent)

          if (jsonData && typeof jsonData === 'object' && !Array.isArray(jsonData)) {
            for (const [key, value] of Object.entries(jsonData)) {
              assignVariable(key, value)
            }
          } else {
            console.warn(`⚠️ File [${dir}/${file}] must contain a valid JSON object.`)
          }

        } catch (err: any) {
          console.error(`❌ Error parsing JSON in [${dir}/${file}]:`, err.message)
        }
      }
    }
  } catch (err: any) {
    console.error("❌ Critical failure during configuration loading:", err)
  }
})()

export { variables }