import { commandsData } from "#commandsData"
import { localized } from "../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_coinflip.slash
const options = slash.options

export default new ApplicationCommand({
  independent: true,
  code: `
    $handleCoinflip
  `,
  data: {
    type: 1,
    ...localized(slash),

    options: [
      { type: 4, required: false, min_value: 5, ...localized(options[0]) },
      {
        type: 3,
        required: false,

        ...localized(options[1]),

        choices: [
          { ...localized(options[1].choices[0]), value: "h" },
          { ...localized(options[1].choices[1]), value: "t" },
        ],
      },
    ],
  },
})
