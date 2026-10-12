import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_beachball.slash

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleSoccer
  `,
  data: {
    type: 1,

    ...localized(slash)
  }
})
