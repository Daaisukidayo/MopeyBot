import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHourOverContainer",
  description: "adds the 'hour's over' notice w/ the button that ends the challenge",
  brackets: true,
  params: [
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.String,
    },
    {
      name: "locale",
      description: "the user's language",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$env[locale]]
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.completedDescription1.$get[l]]]
      $addTextDisplay[$tl[ui.challenge.completedDescription2.$get[l]]]
      $addSeparator
      $addActionRow
      $addButton[confirmEndingChallenge-$env[userId];$tl[ui.challenge.buttonLabelConfirm.$get[l]];Success;✅]
    ;$getGlobalVar[luckyColor]]
  `,
})
