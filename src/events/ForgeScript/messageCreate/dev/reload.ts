import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: "reload",
  aliases: ["rl"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $onlyIf[$or[$isDev;$authorID==485453670729646090]]

    $c[config = res/config, locale = texts (reread lazily), data = animal caches, all = everything]
    $let[part;$toLowerCase[$default[$message[0];all]]]
    $onlyIf[$isOneOf[$get[part];all;config;locale;data];
      $newError[Usage: reload (all | config | locale | data)]
    ]

    $let[start;$getTimestamp]
    $arrayLoad[done]

    $if[$isOneOf[$get[part];all;config];
      $arrayPush[done;Config: \`$reloadConfig\` variables]
    ]
    $if[$isOneOf[$get[part];all;locale];
      $clearCache[locale]
      $arrayPush[done;Locale: the texts are read again when next used]
    ]
    $if[$isOneOf[$get[part];all;data];
      $reloadData
      $arrayPush[done;Data: the animals, rares, arena and tiers caches]
    ]

    $addContainer[
      $addTextDisplay[## Reloaded in \`$math[$getTimestamp - $get[start]]ms\`]
      $addTextDisplay[$arrayJoin[done;\n]]
    ;$getGlobalVar[defaultColor]]
  `,
})
