export default {
  name: 'handlePrefix',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.errors.disabledInDMs.$get[l]]]
    ]

    $let[newPrefix;$default[$option[new-prefix];$message[0]]]

    $onlyIf[$get[newPrefix]!=;
      $newError[$tl[ui.errors.usage.$get[l];$getGuildVar[prefix]prefix <$tl[ui.args.newPrefix.$get[l]]>]]
    ]

    $onlyIf[$get[newPrefix]!=$getGuildVar[prefix];
      $newError[$tl[ui.prefix.old.$get[l]]]
    ]

    $onlyIf[$hasPerms[$guildID;$authorID;ManageGuild];
      $newError[$tl[ui.prefix.missingPerm.$get[l]]]
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
      $addTextDisplay[$tl[ui.prefix.changed.$get[l];$get[newPrefix]]]
    ;$getGlobalVar[defaultColor]]
  `
}