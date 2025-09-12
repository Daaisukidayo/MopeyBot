import historySnippets from "#snippets/historySnippets.js"
import universalSnippets from "#snippets/universalSnippets.js"

// Embed when editing an existing history page, appears after running 'editHistory'

export default [{
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryOptions]
    $let[value;$selectMenuValues]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$get[value]==editExistingHistoryPage]
    ${universalSnippets.loadProfile()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $modal[editHistoryPageModal-$authorID;Edit Existing History Page]
    $addTextInput[editHistoryPageNumber;Enter page number;Short;true]
    $addTextInput[editHistoryPageSorting;Enter sorting type;Short;true;date | points | rares]
    $showModal

    $fetchResponse[$channelID;$messageID]
    $interactionUpdate
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryPage,editHistoryPageModal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    ${universalSnippets.loadProfile()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]

    $jsonLoad[history;$env[userProfile;1hl;history]]

    $let[page;$default[$input[editHistoryPageNumber];$env[IID;0]]]
    $onlyIf[$and[$isNumber[$get[page]];$get[page]>0];
      $callFunction[newError;Invalid page number]
      $ephemeral
      $interactionReply
    ]
    $let[sortType;$default[$toLowerCase[$input[editHistoryPageSorting]];$env[IID;1]]]
    $onlyIf[$arrayIncludes[sortingOptions;$get[sortType]];
      $callFunction[newError;Invalid sorting type]
      $ephemeral
      $interactionReply
    ]

    $onlyIf[$env[history;$math[$get[page] - 1]]!=;
      $callFunction[embed;error]
      $description[## Failed to execute command on this page. Error: \`Page does not exist anymore\`]
      $ephemeral
      $interactionReply
    ]

    ${historySnippets.editHistoryEmbed()}
    $ephemeral
    $if[$isModal;$interactionUpdate;$interactionReply]
  `
}]