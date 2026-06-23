export default {
  name: 'handleReport',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addAuthorDisplay
      $addSection[  
        $addTextDisplay[$tl[ui.report.title.$get[l]]]
        $addButton[reportButton-$authorID;$tl[ui.report.buttonLabel.$get[l]];Success;📢]
      ]
    ;$getGlobalVar[defaultColor]]

    $newCommandTimeout
  `
}