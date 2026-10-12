import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "interactionFail",
  description: "Sends a warning message if the user cannot interact with the message",
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $ephemeral 
    $interactionReply[$tl[ui.special.interactionFail.$get[l]]]
  `
})
