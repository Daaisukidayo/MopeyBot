export default {
  name: "play", 
  type: "messageCreate",
  description: "first time playing",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $c[$newError[$tl[ui.special.commandDisabled]]]

    $onlyIf[$guildID!=;
      $newError[$tl[ui.play.unableInDm]]
    ]

    $jsonLoad[funcCache;{}]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[playData;$getUserVar[userPlayData]]

    $if[$env[playData;started];
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.play.activeSession]]
        $addTextDisplay[### $hyperlink[$tl[ui.play.endPreviousGame];https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
        $addSeparator
        $addActionRow
        $addButton[messagemissing-play-$authorID;$tl[ui.play.buttonLabelCantFind];Danger]
      ;$getGlobalVar[defaultColor]]
      $sendMessage[$channelID]
      $stop
    ]
      
    $setUserVar[allRareAttemptsInfo;$generateLuck[$getGlobalVar[playRaritiesKey]]]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.chooseAnimal]]
      $addUpgradeMenu
      $addSeparator[Large]
      $addCheats
      $addExitButton
    ;$getGlobalVar[defaultColor]]
    $let[msgID;$sendMessage[$channelID;;true]]

    $!jsonSet[playData;MessageID;"$get[msgID]"]
    $!jsonSet[playData;ChannelID;"$channelID"]
    $!jsonSet[playData;GuildID;"$guildID"]
    $!jsonSet[playData;started;true]
    $updatePlayData
  `
}