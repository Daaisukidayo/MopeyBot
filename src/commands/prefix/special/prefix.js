export default [{
  name: "prefix",
  type: "messageCreate",
  code: `
    $handlePrefix
  `
},{
  type: "messageCreate",
  unprefixed: true,
  code: `
    $onlyIf[$mentioned[0]==$botID]
    $onlyIf[$noMentionMessage==]
    $onlyIf[$guildID!=]
    $onlyIf[$userReferenceID==]

    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]

    $sendMessage[$channelID;$tl[ui.prefix.current;$getGuildVar[prefix]]]
  `
}]
