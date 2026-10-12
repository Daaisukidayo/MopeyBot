import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handlePing",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
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
})
