"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "historyEmbed",
    description: "Displays the embed for 'history' commands.",
    params: [
        {
            name: "_historyData",
            description: "The history object that holds the data",
            type: "Json",
            required: false,
        }
    ],
    code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      
      $if[$env[_historyData]!=;
        $jsonLoad[res;$generateList[$sortList[$env[_historyData;raresList]]]]
        $jsonLoad[list;$env[res;l]]

        $addTextDisplay[$tl[$get[l];ui;history.points;$default[$env[_historyData;points];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[$get[l];ui;history.rares;$default[$env[_historyData;rares];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[$get[l];ui;history.playType;$default[$tl[$get[l];data;playTypes.$env[_historyData;playType]];$tl[$get[l];ui;history.unknownValue]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[$get[l];ui;history.difficulty;$default[$tl[$get[l];data;difficulties.$env[_historyData;difficulty]];$tl[$get[l];ui;history.unknownValue]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[$get[l];ui;history.endDate;$discordTimestamp[$default[$env[_historyData;endDate];0];LongDateTime]]]

        $showDesignedList[$env[list]]
      ;
        $addTextDisplay[$tl[$get[l];ui;history.noHistory]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=embed.js.map