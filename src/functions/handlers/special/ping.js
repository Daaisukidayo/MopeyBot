export default {
  name: 'handlePing',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addSection[
        $addTextDisplay[# $username[$botID]]
        $addThumbnail[$userAvatar[$botID]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.ping.ping;$ping]]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}