export default {
  name: "interFail",
  code: `
    $jsonLoad[l;$readFile[json/localizations.json]]
    $let[language;$env[userProfile;language]]
    $let[content;$default[$env[l;special;0;$get[language]];???]] 
    $ephemeral 
    $interactionReply[## $get[content]]
  `
}