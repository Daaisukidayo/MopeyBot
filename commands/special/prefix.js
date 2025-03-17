module.exports = [{
  name: "prefix",
  type: "messageCreate",
  code: `
    $onlyIf[$guildID!=;Disabled in DMs]
    $reply
    $if[$message==;
      $title[:x: Invalid arguments!]
      $description[### No message written]
      $color[d0321d]
    ;
      $if[$hasPerms[$guildID;$authorID;Administrator;ManageGuild]==true;
          $setGuildVar[prefix;$message]
          ### Successfully changed my prefix in this server to \`$message\`
      ;
          ### You can't change my prefix because you missing following permissions: \`Manage Server\` or \`Administrator\`       
      ]
    ]
  `},{
  name: "",
  type: "messageCreate",
  unprefixed: true,
  code: `
    $onlyIf[$noMentionMessage==]
    $onlyIf[$mentioned[0]==$botID]

    $reply
    $onlyIf[$guildID!=;Disabled in DMs]
    My prefix in this server is \`$getGuildVar[prefix]\``
  }
]
  