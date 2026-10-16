import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addChallengeCompletedContainer",
  description: "Adds a designed container displaying a completed challenge summary: its points, rares and list.",
  params: [
    {
      name: "raresList",
      description: "Object of the caught rare animals: their counts by their IDs.",
      type: ArgType.Json,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[result;$generateList[$env[raresList]]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points.$get[l];\`$jsonGet[result;p]\`]]
      $addTextDisplay[$tl[ui.challenge.rares.$get[l];\`$jsonGet[result;r]\`]]
      $addSeparator[Large]
      $showDesignedList[$jsonGet[result;l]]
    ;$getGlobalVar[luckyColor]]
  `,
})
