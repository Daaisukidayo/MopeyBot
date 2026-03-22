export default [{
  name: "report",
  aliases: ["rep"],
  type: "messageCreate",
  code: `
    $handleReport
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
    $addTextInput[about;$tl[ui.report.textInputNameAbout];Short;true;$tl[ui.report.textInputPlaceholderAbout]]
    $addTextInput[issue;$tl[ui.report.textInputNameIssue];Paragraph;true;$tl[ui.report.textInputPlaceholderIssue]]
    $addLabel[$tl[ui.report.labelName];
      $addFileUpload[modalFile;;10]
    ;$tl[ui.report.labelDescription];false]
    $showModal
    $newCommandTimeout[report]
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

    $arrayLoad[reportFiles;, ;$input[modalFile]]
    $arrayFilter[reportFiles;file;$return[$checkCondition[$env[file]!=]];reportFiles]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.report.sent]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate

    $#sendMessage[$channelID;
      $addContainer[
        $addAuthorDisplay
        $addTextDisplay[# _New report_]
        $addSeparator[Large]
        $addTextDisplay[## $input[about]]
        $addSeparator
        $addTextDisplay[### $input[issue]]

        $if[$arrayLength[reportFiles]!=0;
          $addSeparator
          $addMediaGallery[
            $arrayForEach[reportFiles;file;
              $addMediaItem[$env[file]]
            ]
          ]
        ]

      ;$getGlobalVar[logColor]]
    ]

    $!stopCommandTimeout[report]
  `
}]