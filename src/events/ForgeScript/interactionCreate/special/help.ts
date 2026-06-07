export default {
  type: "interactionCreate",
  allowedInteractionTypes: ['autocomplete'],
  code: `
    $onlyIf[$applicationCommandName==help]
    $let[focusedValue;$focusedOptionValue]

    $jsonLoad[commandsData;$readFile[res/data/commandsData.json]]
    $jsonLoad[commandsData;$jsonEntries[commandsData]]
    $arrayAdvancedSort[commandsData;a;b;$return[$localeCompare[$env[a;1;commandName];$env[b;1;commandName]]];commandsData]

    $if[$get[focusedValue]!=;
      $arrayFilter[commandsData;command;$return[$includes[$env[command;1;commandName];$get[focusedValue]]];commandsData]
    ]

    $loop[25;
      $let[i;$math[$env[i] - 1]]
      $jsonLoad[command;$arrayAt[commandsData;$get[i]]]

      $let[value;$env[command;1;commandName]]

      $if[$get[value]==;
        $break
      ]

      $addChoice[$get[value];$get[value]]
    ;i;true]

    true
  `
}