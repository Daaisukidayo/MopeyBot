export default {
  name: 'handleRules',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.information.$get[l];$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[ui.rules.tos.$get[l];$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[ui.rules.privacyPolicy.$get[l];$getGlobalVar[privacyLink]]]
      $addTextDisplay[$tl[ui.rules.usage.$get[l];$getGlobalVar[usageLink]]]
    ;$getGlobalVar[defaultColor]]
  `
}