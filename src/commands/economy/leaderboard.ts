import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_leaderboard.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleLeaderboard
  `,
  data: {
    type: 1,
    integration_types: [0],
    contexts: [0],

    ...localized(slash),

    options: [
      { type: 4, required: false, min_value: 1, ...localized(options[0]) },
      { type: 4, required: false, min_value: 1, max_value: 10, ...localized(options[1]) },
    ],
  },
})
