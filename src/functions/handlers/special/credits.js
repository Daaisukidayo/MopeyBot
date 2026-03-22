export default {
  name: 'handleCredits',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $addContainer[
      $addTextDisplay[$tl[ui.credits.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.credits.owner&devs]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $addTextDisplay[$tl[ui.credits.artists]]
      $addTextDisplay[$codeBlock[$username[502840819380912139]\n$username[254354531951837186]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.credits.madeWithLove]]
    ;$getGlobalVar[defaultColor]]
  `
}