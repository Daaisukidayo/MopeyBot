export default [{
  type: "interactionCreate",
  allowedInteractionTypes: [ "button" ],
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;reportButton]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $modal[reportModal-$authorid;$tl[$get[l];ui;report.modalTitle]]
    $addTextInput[about;$tl[$get[l];ui;report.textInputNameAbout];Short;true;$tl[$get[l];ui;report.textInputPlaceholderAbout]]
    $addTextInput[issue;$tl[$get[l];ui;report.textInputNameIssue];Paragraph;true;$tl[$get[l];ui;report.textInputPlaceholderIssue]]
    $addLabel[$tl[$get[l];ui;report.labelName];$tl[$get[l];ui;report.labelDescription];
      $addFileUpload[modalFile;;10]
    ]
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
    $let[l;$env[userProfile;language]]
    
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $arrayLoad[reportFiles;, ;$input[modalFile]]
    $arrayFilter[reportFiles;file;$checkCondition[$env[file]!=];reportFiles]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;report.sent]]
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