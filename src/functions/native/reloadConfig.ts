import { ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeDB } from "@tryforge/forge.db"
import { readVariables } from "../../utils/loadVariables"

export default new NativeFunction({
  name: "$reloadConfig",
  description:
    "rereads res/config and makes it the global var defaults. values set w/ setGlobalVar still win. returns how many vars were read",
  unwrap: false,
  output: ArgType.Number,
  execute() {
    const variables = readVariables()
    ForgeDB.variables(variables)
    return this.success(Object.keys(variables).length)
  },
})
