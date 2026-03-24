export default {
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

    $onlyIf[$arrayLength[history]>0;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.history.noHistory]]
      ;$getGlobalVar[luckyColor]]
      $send
    ]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]

    $historyEmbed[$env[history;$get[pageIndex]]]
    $showHistoryExtraEmbed

    $newCommandTimeout
  `
}