import { commandsData } from "#commandsData"
import { localized } from "../../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_createlobby.slash

export default new ApplicationCommand({
  code: `
    $handleCreateLobby
  `,
  data: {
    type: 1,

    ...localized(slash)
  }
})
