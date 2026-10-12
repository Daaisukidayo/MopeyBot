import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_muid.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleMuid
  `,
  data: {
    type: 1,

    ...localized(slash),

    options: [{ type: 4, required: true, min_value: 1, ...localized(options[0]) }]
  }
})
