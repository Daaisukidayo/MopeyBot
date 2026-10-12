import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPrefix",
  description: "Returns the prefix of the current server, or the global prefix in DMs.",
  code: `
    $return[$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]]
  `
})
