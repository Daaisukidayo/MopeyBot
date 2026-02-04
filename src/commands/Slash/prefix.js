export default {
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[ui.errors.disabledInDMs]]
    ]

    $let[newPrefix;$option[newprefix]]

    $onlyIf[$get[newPrefix]!=$getServerVar[prefix];
      $newError[$tl[ui.prefix.old]]
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
    $interactionReply
  `,
  data: {
    name: "prefix",
    description: "Sets a new prefix for the current server",
    options: [
      {
        name: "newprefix",
        description: "Choose a new prefix",
        type: 3,
        required: true
      }
    ]
  }
}