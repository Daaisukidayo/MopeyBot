"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "historyEmbed",
    description: "Displays the embed for 'history' commands.",
    params: [
        {
            name: "historyData",
            description: "The history object that holds the data",
            type: forgescript_1.ArgType.Json
        },
        {
            name: "editHandler",
            description: "The interaction that edits the page (addHistory or editHistory). Without it the page is only shown.",
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[handler;$nullish[$env[editHandler];]]
    $addContainer[
      $addAuthorDisplay

      $if[$env[historyData]!=;
        $jsonLoad[res;$generateList[$jsonGet[historyData;raresList]]]
        $jsonLoad[list;$jsonGet[res;l]]

        $if[$get[handler]==;
          $addTextDisplay[$tl[ui.history.points.$get[l];$default[$jsonGet[historyData;points];-1]]]
          $addSeparator[Small;true]
          $addTextDisplay[$tl[ui.history.rares.$get[l];$default[$jsonGet[historyData;rares];-1]]]
          $addSeparator[Small;true]
          $addTextDisplay[$tl[ui.history.playType.$get[l];$default[$tl[data.playTypes.$jsonGet[historyData;playType].$get[l]];$tl[ui.history.unknownValue.$get[l]]]]]
          $addSeparator[Small;true]
          $addTextDisplay[$tl[ui.history.difficulty.$get[l];$default[$tl[data.difficulties.$jsonGet[historyData;difficulty].$get[l]];$tl[ui.history.unknownValue.$get[l]]]]]
          $addSeparator[Small;true]
          $addTextDisplay[$tl[ui.history.endDate.$get[l];$discordTimestamp[$default[$jsonGet[historyData;endDate];0];LongDateTime]]]
          $addSeparator[Small;true]
          $addTextDisplay[$tl[ui.history.raresListLabel.$get[l]]]
          $showDesignedList[$env[list]]
        ;
          $c[Editing: a typed value has an Edit button that opens its form, the play type and the difficulty have a menu that saves the choice]
          $let[editId;$get[handler]-edit-$authorID]
          $let[editLabel;$tl[ui.history.buttonLabelEdit.$get[l]]]

          $addSection[
            $addTextDisplay[$tl[ui.history.points.$get[l];$default[$jsonGet[historyData;points];-1]]]
            $addButton[$get[editId]-points;$get[editLabel];Success]
          ]
          $addSeparator[Small;true]
          $addSection[
            $addTextDisplay[$tl[ui.history.rares.$get[l];$default[$jsonGet[historyData;rares];-1]]]
            $addButton[$get[editId]-raresQuantity;$get[editLabel];Success]
          ]
          $addSeparator[Small;true]

          $arrayForEach[$arrayOf[playType;difficulty];option;
            $let[values;$if[$env[option]==playType;playTypes;difficulties]]
            $addTextDisplay[$tl[ui.history.$env[option]Label.$get[l]]]
            $addActionRow
            $addStringSelectMenu[$get[handler]-set-$authorID-$env[option];$tl[ui.history.menuTitle$if[$env[option]==playType;PlayType;Difficulty].$get[l]]]
            $arrayForEach[$getGlobalVar[$get[values]];value;
              $addOption[$tl[data.$get[values].$env[value].$get[l]];;$env[value];;$checkCondition[$env[value]==$jsonGet[historyData;$env[option]]]]
            ]
            $addSeparator[Small;true]
          ]

          $addSection[
            $addTextDisplay[$tl[ui.history.endDate.$get[l];$discordTimestamp[$default[$jsonGet[historyData;endDate];0];LongDateTime]]]
            $addButton[$get[editId]-endDate;$get[editLabel];Success]
          ]
          $addSeparator[Small;true]
          $addSection[
            $addTextDisplay[$tl[ui.history.raresListLabel.$get[l]]]
            $addButton[$get[editId]-raresList;$get[editLabel];Success]
          ]

          $showDesignedList[$env[list]]
        ]
      ;
        $addTextDisplay[$tl[ui.history.noHistory.$get[l]]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
});
//# sourceMappingURL=historyEmbed.js.map