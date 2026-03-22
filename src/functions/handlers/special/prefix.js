export default {
  name: 'handlePrefix',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.errors.disabledInDMs]]
    ]

    $let[newPrefix;$default[$option[prefix];$message[0]]]

    $onlyIf[$get[newPrefix]!=;
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]prefix <$tl[ui.args.newPrefix]>]]
    ]

    $onlyIf[$get[newPrefix]!=$getServerVar[prefix];
      $newError[$tl[ui.errors.old]]
    ]

    $onlyIf[$hasPerms[$guildID;$authorID;ManageGuild];
      $newError[$tl[ui.prefix.missingPerm]]
    ]

    $setGuildVar[prefix;$get[newPrefix]]
    $let[guildIcon;$guildIcon]
    
    $addContainer[
      $if[$get[guildIcon]==;
        $addTextDisplay[# $guildName]
      ;
        $addSection[
          $addTextDisplay[# $guildName]
          $addThumbnail[$get[guildIcon]]
        ]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.prefix.changed;$get[newPrefix]]]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}