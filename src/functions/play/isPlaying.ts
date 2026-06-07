export default {
  name: 'isPlaying',
  code: `
    $let[started;$env[playData;started]]
    $let[isThisMessage;$checkCondition[$env[playData;MessageID]==$messageID]]
    $let[isThisChannel;$checkCondition[$env[playData;ChannelID]==$channelID]]
    $onlyIf[$and[$get[started];$get[isThisMessage];$get[isThisChannel]]]
  `
}