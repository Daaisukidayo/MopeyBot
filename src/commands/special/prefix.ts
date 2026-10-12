import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_prefix.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handlePrefix
  `,
  data: {
    type: 1,
    integration_types: [0],
    contexts: [0],
    default_member_permissions: "32",

    ...localized(slash),

    options: [{ type: 3, required: true, min_length: 1, max_length: 5, ...localized(options[0]) }]
  }
})
