export default {
  name: 'handlePrefix',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[$get[l];ui;errors.disabledInDMs]]
    ]

    $let[newPrefix;$default[$option[new-prefix];$message[0]]]

    $onlyIf[$get[newPrefix]!=;
      $newError[$tl[$get[l];ui;errors.usage;$getGuildVar[prefix]prefix <$tl[$get[l];ui;args.newPrefix]>]]
    ]

    $onlyIf[$get[newPrefix]!=$getGuildVar[prefix];
      $newError[$tl[$get[l];ui;prefix.old]]
    ]

    $onlyIf[$hasPerms[$guildID;$authorID;ManageGuild];
      $newError[$tl[$get[l];ui;prefix.missingPerm]]
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
      $addTextDisplay[$tl[$get[l];ui;prefix.changed;$get[newPrefix]]]
    ;$getGlobalVar[defaultColor]]
  `
}