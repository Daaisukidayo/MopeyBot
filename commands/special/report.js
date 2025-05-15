module.exports = [{
  name: "report",
  aliases: ["rep"],
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5m]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    
    $let[msgid;$sendMessage[$channelid;## Click button below to open your report menu;true]]
    $addActionRow
    $addButton[report-$authorID;Click;Success;📢]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m]

  `
}]