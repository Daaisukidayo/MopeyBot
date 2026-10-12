import { commandsData } from "#commandsData"
import { localized } from "../../../utils/getLocalization.js"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_editlist.slash
const options = slash.options

export default new ApplicationCommand({
  code: `
    $handleEditlist
  `,
  data: {
    type: 1,

    ...localized(slash),

    options: [
      { type: 3, required: true, ...localized(options[0]) },
      {
        type: 3,
        required: true,

        ...localized(options[1]),

        choices: [
          { ...localized(options[1].choices[0]), value: "+" },
          { ...localized(options[1].choices[1]), value: "-" }
        ]
      },
      { type: 3, required: true, ...localized(options[2]) }
    ]
  }
})
