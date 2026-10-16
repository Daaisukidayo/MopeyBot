import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_chart.slash

export default new ApplicationCommand({
  code: `
    $handleChart
  `,
  data: {
    type: 1,

    ...localized(slash),
  },
})
