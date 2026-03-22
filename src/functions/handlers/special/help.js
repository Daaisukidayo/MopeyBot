export default {
  name: 'handleHelp',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $let[arg;$toLowerCase[$default[$option[command];$message[0]]]]
    $let[emoji;$getGlobalVar[emoji]]
    $let[prefix;$getGuildVar[prefix]]
    $let[maxCoinflipBet;$getGlobalVar[maxCoinflipBet]]
    $let[maxSlotsBet;$getGlobalVar[maxSlotsBet]]
    $let[maxParticipants;$getGlobalVar[maxParticipants]]
    $let[timezonesHyperlink;$hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]


    $jsonLoad[locales;$getGlobalVar[allLocales]]
    $jsonLoad[commandLocaleInfo;$readFile[src/locales/$env[locales;$env[userProfile;language];name]/cmds.json]]
    $jsonLoad[allCommandsInfo;$readFile[src/json/commandsData.json]]
    $jsonLoad[commandInfo;$arrayFind[allCommandsInfo;obj;$return[$advArrayIncludes[$env[obj;commandAliases];$get[arg]]]]]
    $jsonLoad[bracketsInfo;$tl[data.bracketsInfo]]
    $jsonLoad[umbrellaRarities;$tl[data.umbrellaRarities]]
    $jsonLoad[beachballRarities;$tl[data.beachballRarities]]
    $jsonLoad[pumpkinRarities;$tl[data.pumpkinRarities]]
    $jsonLoad[categories;$getGlobalVar[helpCategories]]
    $jsonLoad[slashCommandsData;$getGlobalVar[slashCommandsData]]

    $arrayMap[locales;obj;
      $return[$env[obj;name] - $env[obj;description]]
    ;locales]

    $if[$env[commandInfo]==;

      $addContainer[
        $addTextDisplay[$tl[ui.help.allCommandsTitle]]
        $addSeparator
        $addTextDisplay[$tl[ui.help.detailed]]
        $addSeparator

        $arrayForEach[categories;c;
          $arrayCreate[prefixCommands]
          $arrayCreate[slashCommands]

          $arrayForEach[allCommandsInfo;obj;
            $if[$env[c]==$env[obj;commandCategory];

              $let[command;$env[obj;commandAliases;0]]
              $arrayPush[prefixCommands;$get[command]]
              $arrayPush[slashCommands;</$get[command]:$env[slashCommandsData;$get[command]]>]

            ]
          ]

          $addTextDisplay[## _$tl[data.helpCategories.$env[c]]_]
          $addTextDisplay[$codeBlock[$arrayJoin[prefixCommands; ]]]
          $addTextDisplay[$arrayJoin[slashCommands; ]]
          $addSeparator[Large]
        ]

        $addTextDisplay[$tl[ui.help.assistance;$getGlobalVar[discordServerInvite]]]
      ;$getGlobalVar[defaultColor]]

    ;
      
      $jsonLoad[replacements;$getGlobalVar[helpReplacements]]
      $jsonLoad[commandRelated;$env[commandInfo;commandRelated]]
      $jsonLoad[commandAliases;$env[commandInfo;commandAliases]]
      $let[commandKey;$arrayAt[commandAliases;0]]
      $jsonLoad[commandDesc;$env[commandLocaleInfo;$get[commandKey];commandDescription]]
      $let[description;$arrayJoin[commandDesc;\n]]

      $arrayForEach[replacements;obj;
        $let[description;$replace[$get[description];$env[obj;0];$eval[$env[obj;1];false];-1]]
      ]

      $let[description;$replace[$get[description];(N);\n;-1]]

      $addContainer[
        $addTextDisplay[$tl[ui.help.commandTitle;$env[commandLocaleInfo;$get[commandKey];commandName]]]
        $addSeparator
        $addTextDisplay[$get[description]]
        $addSeparator
        $addTextDisplay[$tl[ui.help.aliasesTitle]]
        $addTextDisplay[## \`$arrayJoin[commandAliases;\` \`]\`]
        $addSeparator
        $addTextDisplay[$tl[ui.help.relatedTitle]]
        $addTextDisplay[## \`$default[$arrayJoin[commandRelated;\` \`];$tl[ui.help.none]]\`]
      ;$getGlobalVar[defaultColor]]
    ]
    $send
  `
}