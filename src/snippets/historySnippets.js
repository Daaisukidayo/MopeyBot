import chalSnippets from "./challengeSnippets.js"
import uniSnippets from "./universalSnippets.js"

export default {
  editHistoryEmbed() {
    return `
      $addContainer[
        $callFunction[newAuthor]
        $addSeparator[Large]
        $addTextDisplay[## Choose what you want to edit!]
        $addSeparator
        $addActionRow
        $addStringSelectMenu[$get[page]-$get[sortType]-historyChooseEdit-$authorID;Choose an option]
        $addOption[Points;;points]
        $addOption[Rares;;raresQuantity]
        $addOption[Play Type;;playType]
        $addOption[Difficulty;;difficulty]
        $addOption[Ended at;;endedAt]
        $addOption[Tags;;tags]
        $addOption[Rares List;;raresList]
      ;$getGlobalVar[luckyColor]]
    `
  },

  historyEmbed() {
    return `
      $let[index;$math[$get[page] - 1]]
      $jsonLoad[allLobbyTagsContent;$getGlobalVar[allLobbyTagsContent]]
      $jsonLoad[raresList;$env[history;$get[index];raresList]]
      $jsonLoad[tags;$env[history;$get[index];tags]]
      $jsonLoad[sortingOptions;$getGlobalVar[sortingOptions]]
      
      ${uniSnippets.settingTagsContent()}
      ${chalSnippets.listGenerator()}

      $addContainer[
        $callFunction[newAuthor]
        $addSeparator[Large]
        $addTextDisplay[### Points: \`$default[$env[history;$get[index];points];-1]\`]
        $addSeparator
        $addTextDisplay[### Rares: \`$default[$env[history;$get[index];rares];-1]\`]
        $addSeparator
        $addTextDisplay[### Play Type: \`$default[$toTitleCase[$env[history;$get[index];playType]];Unknown]\`]
        $addSeparator
        $addTextDisplay[### Difficulty: \`$default[$toTitleCase[$env[history;$get[index];difficulty]];Unknown]\`]
        $addSeparator
        $addTextDisplay[### Ended at: $discordTimestamp[$env[history;$get[index];endedAt];LongDateTime]]
        $addSeparator
        $addTextDisplay[## Tags]
        $addTextDisplay[$codeBlock[$arrayJoin[tagsContent;\n]]]
        $addSeparator[Large]
        ${chalSnippets.listDesign()}

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
  },

  sorting() {
    return `
      $switch[$get[sortType];
        $case[points;
          $arrayAdvancedSort[history;elem1;elem2;
            $math[$env[elem2;points] - $env[elem1;points]]
          ;history]
        ]

        $case[rares;
          $arrayAdvancedSort[history;elem1;elem2;
            $math[$env[elem2;rares] - $env[elem1;rares]]
          ;history]
        ]

        $case[date;
          $arrayAdvancedSort[history;elem1;elem2;
            $math[$env[elem2;endedAt] - $env[elem1;endedAt]]
          ;history]
        ]
      ]
    `
  },

  timeoutName() { return `1HLHISTORY-$authorID` },

  stopTimeout() {
    return `
      $!stopTimeout[${this.timeoutName()}]
    `
  },

  timeout() {
    return `
      ${this.stopTimeout()}
      $setTimeout[
        $!deleteMessage[$channelID;$get[msg]]
      ;1m;${this.timeoutName()}]
    `
  },
}