import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getPrefix",
  description: "the server's prefix, or the global one in DMs",
  code: `
    $return[$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]]
  `,
})
