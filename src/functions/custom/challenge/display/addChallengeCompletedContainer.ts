import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addChallengeCompletedContainer",
  description: "adds the 'challenge done' container: points, rares and the list",
  params: [
    {
      name: "raresList",
      description: "caught rares as counts by ID",
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
