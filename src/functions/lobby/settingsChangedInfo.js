export default {
  name: 'settingsChangedInfo',
  params: [
    {
      name: "content",
      required: true
    }
  ],
  code: `
    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsChange]]
      $addSeparator[Large]
      $addTextDisplay[$env[content]]
    ;$getGlobalVar[luckyColor]]
    $let[msg;$sendMessage[$channelID;;true]]
    $async[
      $wait[5s]
      $!deleteMessage[$channelID;$get[msg]]
    ]
  `
}