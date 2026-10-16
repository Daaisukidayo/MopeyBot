import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_math.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleMath
  `,
  data: {
    type: 1,

    ...localized(slash),

    options: [{ type: 3, required: true, ...localized(options[0]) }],
  },
})
