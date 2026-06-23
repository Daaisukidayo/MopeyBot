export default {
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

        $addTextDisplay[$tl[ui.history.points.$get[l];$default[$env[_historyData;points];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.rares.$get[l];$default[$env[_historyData;rares];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.playType.$get[l];$default[$tl[data.playTypes.$env[_historyData;playType].$get[l]];$tl[ui.history.unknownValue.$get[l]]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.difficulty.$get[l];$default[$tl[data.difficulties.$env[_historyData;difficulty].$get[l]];$tl[ui.history.unknownValue.$get[l]]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.endDate.$get[l];$discordTimestamp[$default[$env[_historyData;endDate];0];LongDateTime]]]

        $showDesignedList[$env[list]]
      ;
        $addTextDisplay[$tl[ui.history.noHistory.$get[l]]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}