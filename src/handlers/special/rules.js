export default {
  name: 'handleRules',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rules.information;$getGlobalVar[informationLink]]]
      $addTextDisplay[$tl[ui.rules.tos;$getGlobalVar[tosLink]]]
      $addTextDisplay[$tl[ui.rules.rules;$getGlobalVar[rulesLink]]]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}