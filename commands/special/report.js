export default [{
  name: "report",
  aliases: ["rep"],
  type: "messageCreate",
  code: `
    $reply
    $let[cdTime;5m]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $addActionRow
    $addButton[reportButton-$authorID;Click;Success;📢]
    
    $callFunction[embed;default]
    $description[## Click button below to open your report menu]
    $let[msgid;$sendMessage[$channelid;;true]]

    $setTimeout[
      $disableButtonsOf[$channelID;$get[msgid]]
    ;1m]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;reportButton]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $modal[reportModal-$authorid;Report window]
    $addTextInput[modalInput1;What's your report about?;Short;true;$getGuildVar[prefix]command || user (Discord ID or MUID)]
    $addTextInput[modalInput2;What's the issue?;Paragraph;true;$getGuildVar[prefix]command not working || I'm filing an appeal || typo || user spamming all/most of the commands]
    $showModal
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "modal" ],
  code: `
    $arrayLoad[interactionID;-;$customID]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $onlyIf[$arrayIncludes[interactionID;reportModal]]
    $onlyIf[$arrayIncludes[interactionID;$authorID];$callFunction[notYourBTN]]

    $fetchResponse[$channelID;$messageID]
    $!disableComponents
    $description[## Your report has been sent to the support team!]
    $interactionUpdate

    $sendMessage[$getGlobalVar[reportChannelID];
      # New report
      $title[$input[modalInput1]]
      $description[$input[modalInput2]]
      $color[$getGlobalVar[logColor]]
      $author[From @$username • $authorID;$userAvatar]
      $footer[$serverName;$guildIcon]
    ]
  `
}]