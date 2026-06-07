export default [{
  name: 'handleShowHistory',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $let[page;1]
    $let[pageIndex;0]
    $let[sortType;0]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]
    $jsonLoad[thisHistory;$env[history;$get[pageIndex]]]

    $jsonLoad[cachedHistory;$getGlobalVar[baseCachedHistory]]
    $!jsonSet[cachedHistory;page;$get[page]]
    $!jsonSet[cachedHistory;sortType;$get[sortType]]
    $!jsonSet[cachedHistory;history;$env[history]]

    $historyEmbed[$env[thisHistory]]
    $showHistoryExtraEmbed[$env[cachedHistory]]
    $let[mid;$send]

    $setMessageVar[cachedHistory;$env[cachedHistory];$get[mid]]

    $newHistoryTimeout
  `
},{
  name: 'newHistoryTimeout',
  code: `
    $let[mid;$nullish[$get[mid];$messageID]]
    $!stopAdvancedTimeout[showhistory-$authorID]
    $!advancedTimeout[$esc[$function[
      $deleteMessageVar[cachedHistory;{messageId}]
      $deleteMessageVar[cachedThisHistory;{messageId}]
      $!deleteMessage[{channelId};{messageId}]
    ]];$getGlobalVar[showhistory_cooldown];showhistory-$authorID;{"messageId": "$get[mid]", "channelId": "$channelID"}]
  `
}]