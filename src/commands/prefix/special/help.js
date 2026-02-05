export default {
  name: "help",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $jsonLoad[locales;$getGlobalVar[allLocales]]

    $jsonLoad[allCommandsInfo;$readFile[src/locales/$env[locales;$env[userProfile;language];name]/cmds.json]]
    $let[arg;$toLowerCase[$message[0]]]
    $let[emoji;$getGlobalVar[emoji]]
    $let[prefix;$getGuildVar[prefix]]
    $let[maxCoinflipBet;$getGlobalVar[maxCoinflipBet]]
    $let[maxSlotsBet;$getGlobalVar[maxSlotsBet]]
    $let[maxParticipants;$getGlobalVar[maxParticipants]]
    $let[timezonesHyperlink;$hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
    $let[helpIndex;$arrayFindIndex[allCommandsInfo;obj;$jsonLoad[aliases;$env[obj;commandAliases]] $return[$arrayIncludes[aliases;$get[arg]]]]]


    $jsonLoad[bracketsInfo;$tl[data.bracketsInfo]]
    $jsonLoad[umbrellaRarities;$tl[data.umbrellaRarities]]
    $jsonLoad[beachballRarities;$tl[data.beachballRarities]]
    $jsonLoad[pumpkinRarities;$tl[data.pumpkinRarities]]
    $jsonLoad[ctgs;$getGlobalVar[helpCategories]]
    $arrayMap[locales;obj;
        $return[$env[obj;name] - $env[obj;description]]
    ;locales]


    $if[$get[helpIndex]==-1;

      $addContainer[
        $addTextDisplay[$tl[ui.help.allCommandsTitle]]
        $addSeparator
        $addTextDisplay[$tl[ui.help.detailed]]
        $addSeparator

        $arrayForEach[ctgs;c;
          $arrayMap[allCommandsInfo;obj;
            $if[$env[c]==$env[obj;commandCategory];
              $return[$env[obj;commandAliases;0]]
            ]
          ;ctg]
          $addTextDisplay[## _$tl[data.helpCategories.$env[c]]_]
          $addTextDisplay[$codeBlock[$arrayJoin[ctg; ]]]
          $addSeparator[Large]
        ]

        $addTextDisplay[$tl[ui.help.assistance;$getGlobalVar[discordServerInvite]]]
      ;$getGlobalVar[defaultColor]]

    ;

      $jsonLoad[replacements;${replacements()}]
      $jsonLoad[commandDesc;$env[allCommandsInfo;$get[helpIndex];commandDescription]]
      $jsonLoad[commandAliases;$env[allCommandsInfo;$get[helpIndex];commandAliases]]
      $jsonLoad[commandRelated;$env[allCommandsInfo;$get[helpIndex];commandRelated]]

      $let[description;$arrayJoin[commandDesc;\n]]

      $arrayForEach[replacements;obj;
        $let[description;$replace[$get[description];$env[obj;0];$env[obj;1]]]
      ]

      $let[description;$replace[$get[description];(N);\n;-1]]

      $addContainer[
        $addTextDisplay[$tl[ui.help.commandTitle;$env[allCommandsInfo;$get[helpIndex];commandName]]]
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
  `
}

function replacements() {
  return `[
    ["{PREFIX}", "$get[prefix]"\\],
    ["{MAX_PARTICIPANTS}", "$get[maxParticipants]"\\],
    ["{BRACKETS_INFO}", "\`\`\`$arrayJoin[bracketsInfo;(N)]\`\`\`"\\],
    ["{PUMPKINS_RARITIES}", "\`\`\`JSON(N)$arrayJoin[pumpkinRarities;(N)]\`\`\`"\\],
    ["{BEACHBALLS_RARITIES}", "\`\`\`JSON(N)$arrayJoin[beachballRarities;(N)]\`\`\`"\\],
    ["{UMBRELLAS_RARITIES}", "\`\`\`JSON(N)$arrayJoin[umbrellaRarities;(N)]\`\`\`"\\],
    ["{HYPERLINK_TIMEZONES}", "$get[timezonesHyperlink]"\\],
    ["{EMOJI}", "$get[emoji]"\\],
    ["{MAX_COINFLIP_BET}", "$separate[$get[maxCoinflipBet]]"\\],
    ["{MAX_SLOTS_BET}", "$separate[$get[maxSlotsBet]]"\\],
    ["{AVAILABLE_LOCALES}", "\`\`\`$arrayJoin[locales;(N)]\`\`\`"\\]
  \\]`
}