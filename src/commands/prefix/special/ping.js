export default {
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $let[guildIcon;$guildIcon]
    
    $addContainer[
      $if[$get[guildIcon]==;
        $addTextDisplay[# $guildName]
      ;
        $addSection[
          $addTextDisplay[# $guildName]
          $addThumbnail[$get[guildIcon]]
        ]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.$commandName.ping;$ping]]
      $addTextDisplay[$tl[ui.$commandName.execTime;$floor[$executionTime]]]
    ;$getGlobalVar[defaultColor]]
  `
}