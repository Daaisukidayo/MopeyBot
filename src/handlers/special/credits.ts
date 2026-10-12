import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleCredits",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addContainer[
      $addTextDisplay[$tl[ui.credits.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.credits.owner&devs.$get[l]]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $addTextDisplay[$tl[ui.credits.artists.$get[l]]]
      $addTextDisplay[$codeBlock[$username[502840819380912139]\n$username[254354531951837186]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.credits.madeWithLove.$get[l]]]
    ;$getGlobalVar[defaultColor]]
  `
})
