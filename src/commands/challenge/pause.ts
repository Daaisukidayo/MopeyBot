import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_pause.slash

export default new ApplicationCommand({
  code: `
    $handlePause
  `,
  data: {
    type: 1,

    ...localized(slash)
  }
})
