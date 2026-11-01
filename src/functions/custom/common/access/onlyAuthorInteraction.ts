import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "onlyAuthorInteraction",
  description: "warns the user they're not the author",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral
    $interactionReply[$tl[ui.special.interactionInvalidAuthor.$get[l]]]
  `,
})
