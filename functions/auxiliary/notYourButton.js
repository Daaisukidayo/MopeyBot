export default {
  name: "notYourBTN",
  code: `
    $jsonLoad[l;$readFile[json/localizations.json]]
    $let[language;$env[userProfile;language]]
    $let[content;$default[$env[l;special;1;$get[language]];???]]
    $ephemeral
    $interactionReply[## $get[content]]
  `,
}