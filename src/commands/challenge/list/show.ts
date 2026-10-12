import { commandsData } from "#commandsData"
import { localized } from "../../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_showlist.slash
const options = slash.options

export default new ApplicationCommand({
  code: `
    $handleShowList
  `,
  data: {
    type: 1,

    ...localized(slash),

    options: [{ type: 3, required: false, ...localized(options[0]) }]
  }
})
