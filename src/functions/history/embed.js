export default {
  name: "historyEmbed",
  description: "Displays the embed for 'history' commands.",
  params: [
    {
      name: "h",
      description: "The history object that holds the data.",
      type: "Json",
      required: false,
    }
  ],
  code: `
    $addContainer[
      $addAuthorDisplay
      
      $if[$env[h]!=;
        $jsonLoad[res;$generateList[$sortList[$env[h;raresList]]]]
        $jsonLoad[l;$env[res;l]]

        $addTextDisplay[$tl[ui.history.points;$default[$env[h;points];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.rares;$default[$env[h;rares];-1]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.playType;$default[$tl[data.playTypes.$env[h;playType]];$tl[ui.history.unknownValue]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.difficulty;$default[$tl[data.difficulties.$env[h;difficulty]];$tl[ui.history.unknownValue]]]]
        $addSeparator[Small;false]
        $addTextDisplay[$tl[ui.history.endDate;$discordTimestamp[$default[$env[h;endDate];0];LongDateTime]]]

        $addSeparator[Large]
        $showDesignedList[$env[l]]
      ;
        $addTextDisplay[$tl[ui.history.noHistory]]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}