module.exports = [{
  name: "report",
  aliases: ["rep"],
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5m]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $addActionRow
    $addButton[report-$authorID;Click;Success;📢]
    
    $let[msgid;$sendMessage[$channelid;## Click button below to open your report menu;true]]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m]

  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN;]]
    $onlyIf[$splitText[0]==report]

    $modal[reportModal-$authorid;Report window]
    $addTextInput[modalInput1-$authorid;What's your report about?;Short;true;$getGuildVar[prefix]command || user (Discord ID or MUID)]
    $addTextInput[modalInput2-$authorid;What's the issue?;Paragraph;true;$getGuildVar[prefix]command not working || I'm filing an appeal || typo || user spamming all/most of commands]
    $showModal
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "modal" ],
  code: `
    $textSplit[$customID;-]
    $onlyIf[$splitText[1]==$authorID;$callFunction[notYourBTN;]]


    $onlyIf[$customID==reportModal-$authorID]

    $sendMessage[$getGlobalVar[reportChannelID];
      # New report
      $title[$input[modalInput1-$authorID]]
      $description[$input[modalInput2-$authorID]]
      $color[$getGlobalVar[logColor]]
      $author[From @$username • $authorID;$userAvatar]
      $footer[$serverName;$guildIcon]
    ]

    $!editMessage[$channelID;$messageID;## Your report has been sent to the support team!]

    $deferUpdate
  `
}]