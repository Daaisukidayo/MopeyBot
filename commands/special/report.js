module.exports = [{
  name: "report",
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5m]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    
    $let[msgid;$sendMessage[## Click button below to open your report menu;true]]
    $addActionRow
    $addButton[report-$authorID;Click;success;📢]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m]

  `
}]