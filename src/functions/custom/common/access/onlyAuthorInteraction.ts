import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "onlyAuthorInteraction",
  description: "Sends a warning message if the user is not the author.",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral
    $interactionReply[$tl[ui.special.interactionInvalidAuthor.$get[l]]]
  `
})
