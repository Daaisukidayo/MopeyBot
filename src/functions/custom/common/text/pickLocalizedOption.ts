import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pickLocalizedOption",
  description:
    "Turns an option given as a number or as its name in any language into its index. An unknown option stops the command with an error that lists the names.",
  output: ArgType.Number,
  params: [
    {
      name: "path",
      description: "The locale path of the options, e.g. data.raretryModes",
      type: ArgType.String,
      required: true,
    },
    {
      name: "value",
      description: "The option as the user wrote it",
      type: ArgType.String,
      required: true,
    },
    {
      name: "allowed",
      description: "The array of indexes that can be chosen",
      type: ArgType.Json,
      required: true,
    },
    {
      name: "error",
      description: "The locale path of the error text, which gets the list of names",
      type: ArgType.String,
      required: true,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[index;$if[$isNumber[$env[value]];$env[value];$arrayFindIndex[$jsonEntries[$tl[$env[path]]];e;$arraySome[$jsonEntries[e;1];name;$jsonGet[name;1]==$toTitleCase[$toLowerCase[$env[value]]]]]]]

    $onlyIf[$arrayIncludes[allowed;$get[index]];
      $newError[$tl[$env[error].$get[l];$arrayJoin[$arrayMap[allowed;option;$return[$tl[$env[path].$env[option].$get[l]]]];\`, \`]]]
    ]
    $return[$get[index]]
  `,
})
