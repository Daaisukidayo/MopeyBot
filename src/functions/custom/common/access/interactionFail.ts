import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "interactionFail",
  description: "warns the user they can't interact with this message",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral
    $interactionReply[$tl[ui.special.interactionFail.$get[l]]]
  `,
})
