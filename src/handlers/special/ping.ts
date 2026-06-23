export default {
  name: 'handlePing',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addSection[
        $addTextDisplay[# $username[$botID]]
        $addThumbnail[$userAvatar[$botID]]
      ]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.ping.ping.$get[l];$ping]]
    ;$getGlobalVar[defaultColor]]
  `
}