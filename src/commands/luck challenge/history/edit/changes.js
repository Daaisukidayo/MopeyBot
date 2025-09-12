import historySnippets from "#snippets/historySnippets.js"
import universalSnippets from "#snippets/universalSnippets.js"
import historyOptions from '#snippets/optionsForHistory.js'
import challengeSnippets from '#snippets/challengeSnippets.js'

// Message after the changes were made

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;editHistoryCustomPoints,editHistoryCustomRares,editHistoryCustomPlayType,editHistoryCustomDifficulty,editHistoryCustomEndedAt,editHistoryCustomTags,editHistoryCustomRaresList]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    ${universalSnippets.loadProfile()}
    $onlyIf[$arrayIncludes[IID;$authorID];$callFunction[notYourBTN]]

    $let[value;$selectMenuValues]
    $let[page;$env[IID;0]]
    $let[sortType;$env[IID;1]]
    $let[pageIndex;$math[$get[page] - 1]]

    $timezone[$env[userProfile;timezone]]

    $jsonLoad[history;$env[userProfile;1hl;history]]
    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[animalsIndexes;$getGlobalVar[animalsIndexes]]

    $onlyIf[$env[history;$math[$get[page] - 1]]!=;
      $callFunction[embed;error]
      $description[## Failed to execute command on this page. Error: \`Page does not exist anymore\`]
      $ephemeral
      $interactionReply
    ]

    ${historySnippets.sorting()}

    $jsonLoad[tags;$env[history;$get[pageIndex];tags]]
    $jsonLoad[raresList;$env[history;$get[pageIndex];raresList]]
    $let[pointsInHistory;$env[history;$get[pageIndex];points]]
    $let[rareInHistory;$env[history;$get[pageIndex];rares]]
    $let[endingDateInHistory;$env[history;$get[pageIndex];endedAt]]
    $let[difficultyInHistory;$env[history;$get[pageIndex];difficulty]]
    $let[playTypeInHistory;$env[history;$get[pageIndex];playType]]

    ${historySnippets.editHistoryEmbed()}
    $interactionUpdate

    $switch[$env[IID;2];

      $case[editHistoryCustomPoints;

        $let[input;$input[editedPoints]]
        ${historyOptions.pointsOption()}
        $!jsonSet[history;$get[pageIndex];points;$get[input]]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares quantity!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[pointsInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[input]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomRares;
        $let[input;$input[editedRaresQuantity]]
        ${historyOptions.raresOption()}
        $!jsonSet[history;$get[pageIndex];rares;$get[input]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares quantity!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[rareInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[input]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomPlayType;
        $!jsonSet[history;$get[pageIndex];playType;$get[value]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated play type!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[playTypeInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[value]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomDifficulty;
        $!jsonSet[history;$get[pageIndex];difficulty;$get[value]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated difficulty!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$toTitleCase[$get[difficultyInHistory]]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$toTitleCase[$get[value]]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomEndedAt;
        $let[input;$input[editedEndedAt]]
        $let[date;$unparseDate[$get[input]]]
        ${historyOptions.endedAtOption()}
        $!jsonSet[history;$get[pageIndex];endedAt;$get[date]]
        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated ending date!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$parseDate[$get[endingDateInHistory];Locale]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$parseDate[$get[date];Locale]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomTags;
        ${universalSnippets.settingTagsContent('tags', 'oldTags')}
        ${historyOptions.tagsOption()}
        $!jsonSet[history;$get[pageIndex];tags;$env[tags]]
        ${universalSnippets.settingTagsContent('tags', 'newTags')}

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated tags!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[\`\`\`$arrayJoin[oldTags;, ]\`\`\`]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[\`\`\`$arrayJoin[newTags;, ]\`\`\`]
        ;$getGlobalVar[luckyColor]]
      ]


      $case[editHistoryCustomRaresList;
        ${challengeSnippets.listGenerator()}
        $let[old;$arrayJoin[content; ]]

        $arrayLoad[editedRaresList;,;$input[editedRaresList]]
        $arrayForEach[editedRaresList;elem;
          ${historyOptions.listOption()}
        ]
        $jsonLoad[raresList;$env[raresList]]
        ${challengeSnippets.listGenerator()}
        $let[new;$arrayJoin[content; ]]

        $addContainer[
          $callFunction[newAuthor]
          $addSeparator[Large]
          $addTextDisplay[## Successfully updated rares list!]
          $addSeparator[Large]
          $addTextDisplay[# Old]
          $addTextDisplay[# $get[old]]
          $addSeparator
          $addTextDisplay[# New]
          $addTextDisplay[# $get[new]]
        ;$getGlobalVar[luckyColor]]
        $!jsonSet[history;$get[pageIndex];raresList;$env[raresList]]
      ]
    ]
    
    $!jsonSet[userProfile;1hl;history;$env[history]]
    $setUserVar[userProfile;$env[userProfile]]
    $ephemeral
    $interactionFollowUp
  `
}