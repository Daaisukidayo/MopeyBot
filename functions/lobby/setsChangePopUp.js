export default {
  name: 'messageChangePopUP',
  params: ['changeContent'],
  code: `
    $addContainer[
      $addTextDisplay[# ⚙️ Settings Change]
      $addSeparator[Large]
      $addTextDisplay[$env[changeContent]]
    ;$getGlobalVar[luckyColor]]
    $let[msg;$sendMessage[$channelID;;true]]
    $async[
      $wait[5s]
      $!deleteMessage[$channelID;$get[msg]]
    ]
  `
}