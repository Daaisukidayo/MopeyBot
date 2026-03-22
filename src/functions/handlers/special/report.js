export default {
  name: 'handleReport',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer
    
    $addContainer[
      $addAuthorDisplay
      $addSection[  
        $addTextDisplay[$tl[ui.report.title]]
        $addButton[reportButton-$authorID;$tl[ui.report.buttonLabel];Success;📢]
      ]
    ;$getGlobalVar[defaultColor]]

    $newCommandTimeout
  `
}