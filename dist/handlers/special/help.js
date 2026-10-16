"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleHelp",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $let[arg;$toLowerCase[$default[$option[command];$message[0]]]]
    $jsonLoad[commandsData;$readFile[res/data/commandsData.json]]
    $jsonLoad[commandsEntries;$jsonEntries[commandsData]]

    $c[No command given: every command by category]
    $if[$get[arg]==;
      $addContainer[
        $addTextDisplay[$tl[ui.help.allCommandsTitle.$get[l]]]
        $addSeparator
        $addTextDisplay[$tl[ui.help.detailed.$get[l]]]
        $addSeparator

        $arrayForEach[$getGlobalVar[helpCategories];c;
          $addTextDisplay[## _$tl[data.helpCategories.$env[c].$get[l]]_]
          $addTextDisplay[$codeBlock[$arrayFormat[$arrayFilter[commandsEntries;data;$jsonGet[data;1;category]==$env[c]];{1.name};;; ]]]
          $addSeparator[Large]
        ]

        $addTextDisplay[$tl[ui.help.assistance.$get[l];$getGlobalVar[discordServerInvite]]]
      ;$getGlobalVar[defaultColor]]
    ;
      $c[A command is found by its name or any of its aliases]
      $jsonLoad[commandInfo;$arrayFind[commandsEntries;data;$or[$arrayIncludes[$jsonGet[data;1;aliases];$get[arg]];$jsonGet[data;1;name]==$get[arg]]]]
      $onlyIf[$env[commandInfo]!=;
        $newError[$tl[ui.help.noInfo.$get[l]]]
      ]

      $let[name;$jsonGet[commandInfo;1;name]]
      $let[description;$arrayJoin[$jsonGet[commandInfo;1;description;$get[l]];\n]]
      $onlyIf[$get[description]!=;
        $logger[Error;$get[name] is missing 'description']
        $newError[$tl[ui.help.noInfo.$get[l]]]
      ]

      $c[A placeholder like {PREFIX} is replaced with what its code gives, (N) with a new line]
      $arrayForEach[$getGlobalVar[helpReplacements];replacement;
        $if[$includes[$get[description];$jsonGet[replacement;0]];
          $let[description;$replace[$get[description];$jsonGet[replacement;0];$eval[$jsonGet[replacement;1];false];-1]]
        ]
      ]
      $let[description;$replace[$get[description];(N);\n;-1]]

      $jsonLoad[aliases;$jsonGet[commandInfo;1;aliases]]
      $arrayUnshift[aliases;$get[name]]
      $arrayMap[$jsonGet[commandInfo;1;related];elem;$return[$nullish[$jsonGet[commandsData;$env[elem];name];$env[elem]]];related]

      $addContainer[
        $addTextDisplay[$tl[ui.help.commandTitle.$get[l];$jsonGet[commandInfo;1;detailedName;$get[l]]]]
        $addSeparator
        $addTextDisplay[$get[description]]
        $addSeparator
        $addTextDisplay[$tl[ui.help.aliasesTitle.$get[l]]]
        $addTextDisplay[## \`$arrayJoin[aliases;\` \`]\`]
        $addSeparator
        $addTextDisplay[$tl[ui.help.relatedTitle.$get[l]]]
        $addTextDisplay[## \`$default[$arrayJoin[related;\` \`];$tl[ui.help.none.$get[l]]]\`]
      ;$getGlobalVar[defaultColor]]
    ]
  `,
});
//# sourceMappingURL=help.js.map