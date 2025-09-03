import listGenerator from "../luck challenge/listGenerator.js"

export default function historyEmbed() {
  return `
    $let[index;$math[$get[page] - 1]]
    $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
    $jsonLoad[raresList;$env[history;$get[index];raresList]]
    $jsonLoad[tags;$env[history;$get[index];tags]]
    $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]

    $if[$arrayLength[tags]==0;
      $arrayPush[tags;none]
    ;
      $arrayMap[tags;tag;$return[$env[allLobbyTagsContent;$env[tag]]];tags]
    ]
    
    ${listGenerator()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[### Points: \`$env[history;$get[index];points]\`]
      $addSeparator
      $addTextDisplay[### Rares: \`$env[history;$get[index];rares]\`]
      $addSeparator
      $addTextDisplay[### Play Type: \`$toTitleCase[$env[history;$get[index];playType]]\`]
      $addSeparator
      $addTextDisplay[### Difficulty: \`$toTitleCase[$env[history;$get[index];difficulty]]\`]
      $addSeparator
      $addTextDisplay[### Ended at: $discordTimestamp[$env[history;$get[index];endedAt];LongDateTime]]
      $addSeparator
      $addTextDisplay[## Tags]
      $addTextDisplay[$codeBlock[$arrayJoin[tags;\n]]]
      $addSeparator[Large]
      $callFunction[listDesign]

      $if[$arrayLength[history]>1;
        $addActionRow
        $addButton[$get[page]-$get[sortType]-historyPageLeft-$authorID;;Primary;⬅️]
        $addButton[$get[page]-$get[sortType]-historyPageCustom-$authorID;Page $get[page]/$arrayLength[history];Primary;🔎]
        $addButton[$get[page]-$get[sortType]-historyPageRight-$authorID;;Primary;➡️]
        $addActionRow
        $addStringSelectMenu[sortHis-$authorID;Sort by]
        $arrayForEach[sortingOptions;option;
          $addOption[Sort Type: $toTitleCase[$env[option]];;$get[page]-$env[option];;$checkCondition[$get[sortType]==$env[option]]]
        ]
      ]
      $if[$env[history;0]!=;
        $addActionRow
        $addButton[$get[page]-$get[sortType]-deleteHistoryPage-$authorID;Delete This Page;Danger;🗑️]
        $addButton[$get[page]-$get[sortType]-editHistoryPage-$authorID;Edit This Page;Success;✏️]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}