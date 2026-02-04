export default [{
  name: "prefix",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.errors.disabledInDMs]]
    ]

    $let[newPrefix;$message]

    $onlyIf[$get[newPrefix]!=;
      $newError[$tl[ui.errors.usage;$getGuildVar[prefix]$commandName <$tl[ui.args.newPrefix]>]]
    ]

    $onlyIf[$get[newPrefix]!=$getServerVar[prefix];
      $newError[$tl[ui.errors.old]]
    ]

    $onlyIf[$hasPerms[$guildID;$authorID;ManageGuild];
      $newError[$tl[ui.$commandName.missingPerm]]
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
      $addTextDisplay[$tl[ui.$commandName.changed;$get[newPrefix]]]
    ;$getGlobalVar[defaultColor]]
  `
},{
  type: "messageCreate",
  unprefixed: true,
  code: `
    $onlyIf[$mentioned[0]==$botID]
    $onlyIf[$noMentionMessage==]
    $onlyIf[$guildID!=]

    $jsonLoad[msgdata;$messageRawData]

    $onlyIf[$env[msgdata;mentions;repliedUser]==null]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]

    $reply
    $sendMessage[$channelID;$tl[ui.prefix.current;$getGuildVar[prefix]]]
  `
}]
