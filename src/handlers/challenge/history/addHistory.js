export default {
  name: 'handleAddhistory',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $timezone[$env[userProfile;timezone]]

    $if[$getUserVar[savedNewHistoryConfig]==;
      $addHistoryNewConfig
    ]

    $historyEmbed[$getUserVar[savedNewHistoryConfig]]
    $addHistoryExtraEmbed
    $newCommandTimeout
  `
}