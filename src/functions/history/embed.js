export default {
  name: "historyEmbed",
  description: "Displays the embed fro 'add history' commands.",
  params: [
    {
      name: "history_object",
      description: "The history object that holds the data.",
      type: "Object",
      required: true,
    }
  ],
  code: `
    $jsonLoad[d;$env[history_object]]
    $onlyIf[$env[d]!=;
      $newError[$tl[ui.history.noHistoryObject]]
    ]

    $jsonLoad[res;$generateList[$sortList[$env[d;raresList]];$env[d;difficulty]]]
    $jsonLoad[l;$env[res;l]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.history.points;$default[$env[d;points];-1]]]
      $addSeparator[Small;false]
      $addTextDisplay[$tl[ui.history.rares;$default[$env[d;rares];-1]]]
      $addSeparator[Small;false]
      $addTextDisplay[$tl[ui.history.playType;$default[$tl[data.playTypes.$env[d;playType]];$tl[ui.history.unknownValue]]]]
      $addSeparator[Small;false]
      $addTextDisplay[$tl[ui.history.difficulty;$default[$tl[data.difficulties.$env[d;difficulty]];$tl[ui.history.unknownValue]]]]
      $addSeparator[Small;false]
      $addTextDisplay[$tl[ui.history.endDate;$discordTimestamp[$env[d;endDate];LongDateTime]]]

      $addSeparator[Large]
      $showDesignedList[$env[l]]
    ;$getGlobalVar[luckyColor]]
  `
}