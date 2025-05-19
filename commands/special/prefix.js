module.exports = [{
  name: "prefix",
  type: "messageCreate",
  code: `
    $reply
    $callFunction[checking;]

    $onlyIf[$guildID!=;
      $title[:x: Invalid server!]
      $description[### Disabled in DMs]
      $color[$getGlobalVar[errorColor]]
    ]

    $onlyIf[$message!=;
      $title[:x: Invalid arguments!]
      $description[### No message written]
      $color[$getGlobalVar[errorColor]]
    ]
      
    $onlyIf[$hasPerms[$guildID;$authorID;Administrator;ManageGuild]==true;
      $title[:x: Missing Permissions!]
      $description[### You can't change my prefix because you missing following permissions: \`Manage Server\` or \`Administrator\`]
      $color[$getGlobalVar[errorColor]]
    ]

    $setGuildVar[prefix;$message]
    ### Successfully changed my prefix in this server to \`$message\`
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

    $reply
    My prefix in this server is \`$getGuildVar[prefix]\`
  `
}]
