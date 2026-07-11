import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addChallengeCompletedContainer",
  description: "Adds a designed container displaying a completed challenge summary (points, rares, and list).",
  params: [
    {
      name: "_data",
      description: "JSON object with data for the completed challenge. Expected keys: locale, points, rares, hidePoints, hideRares, list.",
      type: ArgType.Json,
    }
  ],
  code: `
    $jsonLoad[baseData;{
      "locale": null,
      "points": 0,
      "rares": 0,
      "hidePoints": false,
      "hideRares": false,
      "list": {}
    }]
    $jsonAssign[baseData;newData;$env[_data]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed.$env[newData;locale]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points.$env[newData;locale];$if[$env[newData;hidePoints];||$env[newData;points]||;\`$env[newData;points]\`]]]
      $addTextDisplay[$tl[ui.challenge.rares.$env[newData;locale];$if[$env[newData;hideRares];||$env[newData;rares]||;\`$env[newData;rares]\`]]]
      $addSeparator[Large]
      $showDesignedList[$env[_data;list]]
    ;$getGlobalVar[luckyColor]]
  `
})