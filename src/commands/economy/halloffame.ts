import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_halloffame.slash

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleHalloffame
  `,
  data: {
    type: 1,
    integration_types: [0],
    contexts: [0],

    ...localized(slash),
  },
})
