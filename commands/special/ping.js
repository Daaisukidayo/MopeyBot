export default {
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[language;$env[userProfile;language]]

    $let[ping;$default[$replace[$env[l10n;ping;0;$get[language]];{0};$ping];No text found at $get[language]-0]]
    $let[execTime;$default[$replace[$env[l10n;ping;1;$get[language]];{0};$floor[$executionTime]];No text found at $get[language]-1]]

    **$get[ping]**\n**$get[execTime]** 
  `
}