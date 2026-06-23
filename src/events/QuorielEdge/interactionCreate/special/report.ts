export default [{
  name: "reportButton",
  type: "interactionCreate",
  allowed: [ "button" ],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $modal[reportModal-$authorID;$tl[ui.report.modalTitle.$get[l]]]
    $addTextInput[about;$tl[ui.report.textInputNameAbout.$get[l]];Short;true;$tl[ui.report.textInputPlaceholderAbout.$get[l]]]
    $addTextInput[issue;$tl[ui.report.textInputNameIssue.$get[l]];Paragraph;true;$tl[ui.report.textInputPlaceholderIssue.$get[l]]]
    $addLabel[$tl[ui.report.labelName.$get[l]];$tl[ui.report.labelDescription.$get[l]];
      $addFileUpload[modalFile;;10]
    ]
    $showModal
    $newCommandTimeout[report]
  `
},{
  name: "reportModal",
  type: "interactionCreate",
  allowed: [ "modal" ],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $arrayLoad[reportFiles;, ;$input[modalFile]]
    $arrayFilter[reportFiles;file;$env[file]!=;reportFiles]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.report.sent.$get[l]]]
    ;$getGlobalVar[defaultColor]]
    $interactionUpdate

    $#sendMessage[$getGlobalVar[reportChannelID];
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