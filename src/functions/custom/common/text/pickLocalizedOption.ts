import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "pickLocalizedOption",
  description:
    "turns an option typed as its number or its name in any language into its key in the locale group. unknown option = the command stops w/ an error listing the names",
  output: ArgType.String,
  params: [
    {
      name: "path",
      description: "locale path of the options, like data.raretryModes",
      type: ArgType.String,
      required: true,
    },
    {
      name: "value",
      description: "the option as the user typed it",
      type: ArgType.String,
      required: true,
    },
    {
      name: "allowed",
      description: "array of keys that can be picked",
      type: ArgType.Json,
      required: true,
    },
    {
      name: "error",
      description: "locale path of the error text, which gets the list of names",
      type: ArgType.String,
      required: true,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $c[a number = position in the group (= the key for numbered groups)]
    $jsonLoad[options;$jsonEntries[$tl[$env[path]]]]
    $let[index;$if[$isNumber[$env[value]];$env[value];$arrayFindIndex[options;e;$arraySome[$jsonEntries[e;1];name;$jsonGet[name;1]==$toTitleCase[$toLowerCase[$env[value]]]]]]]
    $let[key;$if[$get[index]>=0;$jsonGet[options;$get[index];0]]]

    $onlyIf[$arrayIncludes[allowed;$get[key]];
      $newError[$tl[$env[error].$get[l];$arrayJoin[$arrayMap[allowed;option;$return[$tl[$env[path].$env[option].$get[l]]]];\`, \`]]]
    ]
    $return[$get[key]]
  `,
})
