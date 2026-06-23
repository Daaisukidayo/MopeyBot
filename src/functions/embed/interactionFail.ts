export default {
  name: "interactionFail",
  description: "Sends a warning message if the user cannot interact with the message",
  code: `
    $let[l;$env[userProfile;language]]
    $ephemeral 
    $interactionReply[$tl[ui.special.interactionFail.$get[l]]]
  `
}