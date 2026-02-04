export default {
  name: "interactionFail",
  description: "Sends a warning message if the user cannot interact with the message",
  code: `
    $ephemeral 
    $interactionReply[$tl[ui.special.interactionFail]]
  `
}