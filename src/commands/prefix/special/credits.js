export default { 
  name: "credits", 
  aliases: ["owners", "devteam"], 
  type: "messageCreate", 
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $addContainer[
      $addTextDisplay[$tl[ui.$commandName.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.$commandName.owner&devs]]
      $addTextDisplay[$codeBlock[$username[485453670729646090]]]
      $addSeparator
      $c[
        $addTextDisplay[$tl[ui.$commandName.pfpBy]]
        $addTextDisplay[$codeBlock[$username[588624194032500747]]]
      ]
      $addSeparator
      $addTextDisplay[$tl[ui.$commandName.artists]]
      $addTextDisplay[$codeBlock[$username[502840819380912139]\n$username[254354531951837186]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.$commandName.madeWithLove]]
    ;$getGlobalVar[defaultColor]]
  `
}