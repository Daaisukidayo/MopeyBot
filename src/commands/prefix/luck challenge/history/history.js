export default {
  name: "history",
  aliases: ["his"],
  type: "messageCreate",
  description: "history",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]

    $jsonLoad[history;$getUserVar[challengeHistory]]

    $let[page;1]
    $let[pageIndex;0]
    $let[sortType;0]

    $onlyIf[$arrayLength[history]>0;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.history.noHistory]]
      ;$getGlobalVar[luckyColor]]
    ]

    $jsonLoad[history;$sortHistory[$env[history];$get[sortType]]]

    $historyEmbed[$env[history;$get[pageIndex]]]
    $showHistoryExtraEmbed
    $newTimeout[history-$authorID;1m;$sendMessage[$channelID;;true]]
  `
}