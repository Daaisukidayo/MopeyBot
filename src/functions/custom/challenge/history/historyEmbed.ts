import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "historyEmbed",
  description: "Displays the embed for 'history' commands.",
  params: [
    {
      name: "historyData",
      description: "The history object that holds the data",
      type: ArgType.Json
    }
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addAuthorDisplay
      
      $if[$env[historyData]!=;
        $jsonLoad[res;$generateList[$jsonGet[historyData;raresList]]]
        $jsonLoad[list;$jsonGet[res;l]]

        $addTextDisplay[$tl[ui.history.points.$get[l];$default[$jsonGet[historyData;points];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.rares.$get[l];$default[$jsonGet[historyData;rares];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.playType.$get[l];$default[$tl[data.playTypes.$jsonGet[historyData;playType].$get[l]];$tl[ui.history.unknownValue.$get[l]]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.difficulty.$get[l];$default[$tl[data.difficulties.$jsonGet[historyData;difficulty].$get[l]];$tl[ui.history.unknownValue.$get[l]]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.endDate.$get[l];$discordTimestamp[$default[$jsonGet[historyData;endDate];0];LongDateTime]]]

        $showDesignedList[$env[list]]
      ;
        $addTextDisplay[$tl[ui.history.noHistory.$get[l]]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
})
