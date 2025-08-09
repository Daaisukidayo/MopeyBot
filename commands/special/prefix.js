module.exports = [{
  name: "prefix",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $onlyIf[$guildID!=;
      $callFunction[embed;error]
      $description[## Disabled in DMs]
    ]

    $onlyIf[$message!=;
      $callFunction[embed;error]
      $description[## No message written]
    ]
      
    $onlyIf[$hasPerms[$guildID;$authorID;Administrator;ManageGuild]==true;
      $callFunction[embed;error]
      $description[## You're missing the following permissions: \`Manage Server\` or \`Administrator\`]
    ]

    $setGuildVar[prefix;$message]
    $color[$getGlobalVar[defaultColor]]
    $author[$guildName;$guildIcon]
    $description[## Successfully changed prefix to \`$message\`]
  `
},{
  type: "messageCreate",
  unprefixed: true,
  code: `
    $onlyIf[$mentioned==$botID]
    $onlyIf[$noMentionMessage==]
    $onlyIf[$guildID!=]

    $jsonLoad[msgdata;$messageRawData]

    $onlyIf[$env[msgdata;mentions;repliedUser]==null]

    $reply
    ## My prefix in this server is \`$getGuildVar[prefix]\`
  `
}]
