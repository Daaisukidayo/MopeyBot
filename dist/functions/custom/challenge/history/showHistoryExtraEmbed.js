"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showHistoryExtraEmbed",
    description: "Displays an extra embed with page buttons, sort menu, etc.",
    params: [
        {
            name: "historyData",
            description: "The cached history object.",
            type: forgescript_1.ArgType.Json
        }
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[page;$jsonGet[historyData;page]]
    $let[sortType;$jsonGet[historyData;sortType]]
    $let[sortOrder;$default[$jsonGet[historyData;sortOrder];desc]]
    $let[rareAnimalId;$jsonGet[historyData;rareAnimalId]]

    $let[entriesCount;$jsonSize[historyData;history]]
    $let[disableEditing;$checkCondition[$get[entriesCount]==0]]
    $let[disablePages;$checkCondition[$get[entriesCount]<=1]]

    $c[Each sort type has its emoji, sorting by a rare shows that rare]
    $let[rareEmoji;$if[$get[rareAnimalId]!=;$getAnimalInfo[$get[rareAnimalId];emoji;0];$getGlobalVar[undefined]]]
    $jsonLoad[sortEmojis;$arrayOf[📅;🔢;🎏;$get[rareEmoji]]]

    $addContainer[
      $addActionRow
      $addButton[showHistory-deletePage-$authorID;$tl[ui.history.buttonLabelDelete.$get[l]];Danger;🗑️;$get[disableEditing]]
      $addButton[showHistory-editPage-$authorID;$tl[ui.history.buttonLabelEdit.$get[l]];Success;✏️;$get[disableEditing]]

      $addSeparator[Large]

      $addActionRow
      $addButton[showHistory-prevPage-$authorID;;Primary;⬅️;$get[disablePages]]
      $addButton[showHistory-showPages-$authorID;$tl[ui.history.buttonLabelPage.$get[l];$get[page];$get[entriesCount]];Primary;🔎;$get[disablePages]]
      $addButton[showHistory-nextPage-$authorID;;Primary;➡️;$get[disablePages]]

      $addSeparator[Large]

      $addActionRow
      $addStringSelectMenu[showHistory-sortingMenu-$authorID;;$get[disablePages]]
      $arrayForEach[$getGlobalVar[sortingOptions];option;
        $addOption[$tl[ui.history.optionNameSort.$get[l];$tl[data.sortingOptions.$env[option].$get[l]]];;$env[option];$jsonGet[sortEmojis;$env[option]];$checkCondition[$get[sortType]==$env[option]]]
      ]

      $addActionRow
      $addStringSelectMenu[showHistory-orderMenu-$authorID;;$get[disablePages]]
      $arrayForEach[$arrayOf[desc;asc];order;
        $addOption[$tl[ui.history.optionNameOrder.$get[l];$tl[data.sortingOrders.$env[order].$get[l]]];;$env[order];$if[$env[order]==desc;⬇️;⬆️];$checkCondition[$get[sortOrder]==$env[order]]]
      ]

      $addActionRow
      $addButton[showHistory-filterByRareButton-$authorID;$tl[ui.history.buttonLabelFilterByRare.$get[l]];Secondary;$getGlobalVar[filter]]
      $if[$jsonGet[historyData;filter];
        $addButton[showHistory-cancelFilterButton-$authorID;$tl[ui.history.buttonLabelCancelFilter.$get[l]];Danger;$getGlobalVar[filter]]
      ;
        $if[$get[rareAnimalId]!=;
          $addButton[showHistory-filterByChosenRareButton-$authorID;$tl[ui.history.buttonLabelFilterByRare.$get[l]];Success;$get[rareEmoji]]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
});
//# sourceMappingURL=showHistoryExtraEmbed.js.map