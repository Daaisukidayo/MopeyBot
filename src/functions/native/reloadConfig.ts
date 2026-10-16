import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeDB } from "@tryforge/forge.db"
import { readVariables } from "../../utils/loadVariables"

export default new NativeFunction({
  name: "$reloadConfig",
  description:
    "Reads res/config again and makes it the defaults of the global variables. A value set with $setGlobalVar stays in front of its default. Returns how many variables were read",
  unwrap: false,
  output: ArgType.Number,
  execute() {
    const variables = readVariables()
    ForgeDB.variables(variables)
    return this.success(Object.keys(variables).length)
  },
})
