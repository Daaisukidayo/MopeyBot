export default [{
  name: "report",
  aliases: ["rep"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[1m]
    
    $addContainer[
      $addAuthorDisplay
      $addSection[  
        $addTextDisplay[$tl[ui.report.title]]
        $addButton[reportButton-$authorID;$tl[ui.report.buttonLabel];Success;📢]
      ]
    ;$getGlobalVar[defaultColor]]

    $newTimeout[REPORT-$authorID;1m;$sendMessage[$channelid;;true]]
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;reportButton]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $modal[reportModal-$authorid;$tl[ui.report.modalTitle]]
    $addTextInput[modalInput1;$tl[ui.report.textInputNameAbout];Short;true;$tl[ui.report.textInputPlaceholderAbout]]
    $addTextInput[modalInput2;$tl[ui.report.textInputNameIssue];Paragraph;true;$tl[ui.report.textInputPlaceholderIssue]]
    $showModal
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: [ "modal" ],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;reportModal]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.report.sent]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate

    $#sendMessage[$getGlobalVar[reportChannelID];
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[$tl[ui.report.new]]
        $addSeparator[Large]
        $addTextDisplay[## $input[modalInput1]]
        $addSeparator[Small]
        $addTextDisplay[### $input[modalInput2]]
      ;$getGlobalVar[logColor]]
    ]

    $!stopTimeout[REPORT-$authorID]
  `
}]