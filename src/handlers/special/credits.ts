export default {
  name: 'handleCredits',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addContainer[
      $addTextDisplay[$tl[$get[l];ui;credits.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;credits.owner&devs]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $addTextDisplay[$tl[$get[l];ui;credits.artists]]
      $addTextDisplay[$codeBlock[$username[502840819380912139]\n$username[254354531951837186]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;credits.madeWithLove]]
    ;$getGlobalVar[defaultColor]]
  `
}