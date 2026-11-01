import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_rolls.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleRolls
  `,
  data: {
    type: 1,
    integration_types: [0],
    contexts: [0],

    ...localized(slash),

    options: [
      {
        type: 3,
        required: false,
        ...localized(options[0]),
        // value = the game name from rollGames
        choices: options[0].choices.map((choice) => ({ ...localized(choice), value: String(choice.value) })),
      },
    ],
  },
})
