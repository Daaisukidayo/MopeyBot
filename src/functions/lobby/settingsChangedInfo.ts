export default {
  name: 'settingsChangedInfo',
  params: [
    {
      name: "_content",
      required: true
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addTextDisplay[$tl[$get[l];ui;lobby.settingsChange]]
      $addSeparator[Large]
      $addTextDisplay[$env[_content]]
    ;$getGlobalVar[luckyColor]]
    $let[messageId;$sendMessage[$channelID;;true]]
    $setTimeout[
      $!deleteMessage[$channelID;$get[messageId]]
    ;10s]
  `
}