import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_switchlocale.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleSwitchlocale
  `,
  data: {
    type: 1,

    ...localized(slash),

    options: [{ type: 3, required: true, autocomplete: true, ...localized(options[0]) }],
  },
})
