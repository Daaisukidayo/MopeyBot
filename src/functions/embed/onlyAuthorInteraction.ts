export default {
  name: "onlyAuthorInteraction",
  description: "Sends a warning message if the user is not the author.",
  code: `
    $let[l;$env[userProfile;language]]
    $ephemeral
    $interactionReply[$tl[$get[l];ui;special.interactionInvalidAuthor]]
  `,
}