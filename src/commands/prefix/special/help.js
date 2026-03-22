export default [{
  name: "help",
  type: "messageCreate",
  code: `
    $handleHelp
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ['autocomplete'],
  code: `
    $onlyIf[$applicationCommandName==help]
    $let[focusedValue;$focusedOptionValue]

    $jsonLoad[commandsData;$readFile[src/json/commandsData.json]]
    $arrayAdvancedSort[commandsData;a;b;$return[$localeCompare[$env[a;commandAliases;0];$env[b;commandAliases;0]]];commandsData]

    $if[$get[focusedValue]!=;
      $arrayFilter[commandsData;command;$return[$includes[$env[command;commandAliases;0];$get[focusedValue]]];commandsData]
    ]

    $loop[25;
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[command;$arrayAt[commandsData;$get[i]]]

      $let[value;$env[command;commandAliases;0]]

      $if[$get[value]==;
        $interactionFail
        $break
      ]

      $addChoice[$get[value];$get[value]]
    ;i;true]
    $autocomplete
  `
}]