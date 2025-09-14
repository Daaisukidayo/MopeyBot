import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "help",
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '5s'})}

    $jsonLoad[allCommandsInfo;$readFile[src/json/allCommandsInfo.json]]
    $let[arg;$toLowerCase[$message[0]]]
    $let[comNameEmoji;📜]
    $let[emoji;$getGlobalVar[emoji]]
    $let[prefix;$getGuildVar[prefix]]
    $let[maxCoinflipBet;$getGlobalVar[maxCoinflipBet]]
    $let[maxParticipants;$getGlobalVar[maxParticipants]]
    $let[timezonesHyperlink;$hyperlink[List of all timezones;https://en.wikipedia.org/wiki/List_of_tz_database_time_zones]]
    $let[helpIndex;$arrayFindIndex[allCommandsInfo;obj;$jsonLoad[aliases;$env[obj;commandAliases]] $return[$arrayIncludes[aliases;$get[arg]]]]]


    $arrayLoad[bracketsInfo;,;[\\] - required argument(s),{} - required option,() - optional argument(s) or option,<> - data input]
    $arrayLoad[pumpkinsRarities;,;Purple: 1/20,Golden: 1/50,Platinum: 1/100,Diamond: 1/200,Emerald: 1/500,Ruby: 1/1000,Sapphire: 1/1500,Amethyst: 1/2000,Ammolite: 1/3500,Taaffeite: 1/5000]
    $arrayLoad[beachballsRarities;,;Amber: 1/20,Golden: 1/50,Platinum: 1/100,Diamond: 1/200,Jade: 1/500,Pearl: 1/1000,Pink Diamond: 1/1500,Opal: 1/2000,Aquamarine: 1/3500,Tanzanite: 1/5000]
    $arrayLoad[umbrellasRarities;,;Jack-o'-lantern: 1/20,Golden: 1/50,Platinum: 1/100,Diamond: 1/200,Lapis Lazuli: 1/500,Topaz: 1/1000,Quartz: 1/1500,Musgravite: 1/2000,Onyx 1/3500,Painite: 1/5000]
    $arrayLoad[categories;,;Economy,Fun,Special,Gaming,Luck Challenge]

    $if[$get[helpIndex]==-1;
      $addContainer[
        $addTextDisplay[# $get[comNameEmoji] ALL COMMANDS]
        $addSeparator
        $addTextDisplay[### Use \`$get[prefix]help (command)\` for detailed information on a specific command!]
        $addSeparator

        $arrayForEach[categories;category;
          $arrayLoad[ctg]
          $arrayForEach[allCommandsInfo;obj;
            $if[$env[category]==$env[obj;commandCategory];$arrayPush[ctg;$env[obj;commandAliases;0]]]
          ]
          $addTextDisplay[## $env[category]]
          $addTextDisplay[$codeBlock[$arrayJoin[ctg; ]]]
          $addSeparator[Large]
        ]
        $addTextDisplay[Need assistance with a specific issue? Use the invite command to join our official Discord server!]
      ;$getGlobalVar[defaultColor]]
    ;
      $jsonLoad[commandDesc;$env[allCommandsInfo;$get[helpIndex];commandDescription]]
      $jsonLoad[commandAliases;$env[allCommandsInfo;$get[helpIndex];commandAliases]]
      $jsonLoad[commandRelated;$env[allCommandsInfo;$get[helpIndex];commandRelated]]

      $addContainer[
        $addTextDisplay[# $get[comNameEmoji] $env[allCommandsInfo;$get[helpIndex];commandName]]
        $addTextDisplay[$advancedReplace[$arrayJoin[commandDesc;\n];{PREFIX};$get[prefix];{MAX_PARTICIPANTS};$get[maxParticipants];{BRACKETS_INFO};$codeBlock[$arrayJoin[bracketsInfo;\n]];{PUMPKINS_RARITIES};$codeBlock[$arrayJoin[pumpkinsRarities;\n];JSON];{BEACHBALLS_RARITIES};$codeBlock[$arrayJoin[beachballsRarities;\n];JSON];{UMBRELLAS_RARITIES};$codeBlock[$arrayJoin[umbrellasRarities;\n];JSON];{HYPERLINK_TIMEZONES};$get[timezonesHyperlink];{EMOJI};$get[emoji];{MAX_COINFLIP_BET};$get[maxCoinflipBet]]]
        $addSeparator
        $addTextDisplay[# 📚 Aliases]
        $addTextDisplay[## \`$arrayJoin[commandAliases;\` \`]\`]
        $addSeparator
        $addTextDisplay[# 📖 Related]
        $addTextDisplay[## \`$default[$arrayJoin[commandRelated;\` \`];None]\`]
      ;$getGlobalVar[defaultColor]]
    ]
  `
}