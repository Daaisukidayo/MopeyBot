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
      $addTextDisplay[$tl[$get[l];ui;ping.ping;$ping]]
    ;$getGlobalVar[defaultColor]]
  `
}