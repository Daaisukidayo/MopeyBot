import fs from "fs"

const variables = {}

for (const dir of ["command", "core"]) {
  const files = fs.readdirSync(`./src/variables/${dir}`)

  for (const file of files) {
    const module = await import(`./${dir}/${file}`)
    Object.assign(variables, module.default)
  }
}

export { variables }