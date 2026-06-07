export default {
  name: 'handlePlay',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $onlyIf[$guildID!=;
      $newError[$tl[$get[l];ui;play.unableInDm]]
    ]

    $onlyIf[$env[userProfile;devMode]==1;
      $newError[$tl[$get[l];ui;special.commandDisabled]]
    ]

    $jsonLoad[playData;$getUserVar[userPlayData]]

    $if[$env[playData;started];
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[$get[l];ui;play.activeSession]]
        $addTextDisplay[### $hyperlink[$tl[$get[l];ui;play.endPreviousGame];https://discord.com/channels/$env[playData;GuildID]/$env[playData;ChannelID]/$env[playData;MessageID]]]
        $addSeparator
        $addActionRow
        $addButton[messagemissing-play-$authorID;$tl[$get[l];ui;play.buttonLabelCantFind];Danger]
      ;$getGlobalVar[defaultColor]]
      $!send
    ;
      $setUserVar[allRareAttemptsInfo;$generateLuck[$getGlobalVar[playRaritiesKey]]]
      $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
      
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[$get[l];ui;play.chooseAnimal]]
        $addUpgradeMenu
        $addSeparator[Large]
        $addExitButton
        $addCheats
      ;$getGlobalVar[defaultColor]]

      $let[mid;$send]

      $!jsonSet[playData;MessageID;"$get[mid]"]
      $!jsonSet[playData;ChannelID;"$channelID"]
      $!jsonSet[playData;GuildID;"$guildID"]
      $!jsonSet[playData;started;true]
      $updatePlayData
    ]
  `
}