export default [{
  name: 'handleHistory',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
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
    $let[mid;$send[true]]

    $setMessageVar[cachedHistory;$env[cachedHistory];$get[mid]]

    $newHistoryTimeout
  `
},{
  name: 'newHistoryTimeout',
  code: `
    $let[mid;$nullish[$get[mid];$messageID]]
    $!stopAdvancedTimeout[history-$authorID]
    $!advancedTimeout[$esc[
      $deleteMessageVar[cachedHistory;{messageId}]
      $deleteMessageVar[cachedThisHistory;{messageId}]
      $!deleteMessage[{channelId};{messageId}]
    ];$getGlobalVar[history_cooldown];history-$authorID;{"messageId": "$get[mid]", "channelId": "$channelID"}]
  `
}]