export default {
  name: "onlyAuthorInteraction",
  description: "Sends a warning message if the user is not the author.",
  code: `
    $ephemeral
    $interactionReply[$tl[ui.special.interactionInvalidAuthor]]
  `,
}