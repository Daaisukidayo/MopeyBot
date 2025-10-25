import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '5s'})}

    $jsonLoad[l10n;$readFile[src/json/localizations.json]]
    $let[language;$env[userProfile;language]]

    $let[ping;$default[$replace[$env[l10n;ping;0;$get[language]];{0};$ping];???]]
    $let[execTime;$default[$replace[$env[l10n;ping;1;$get[language]];{0};$floor[$executionTime]];???]]

    **$get[ping]**\n**$get[execTime]** 
  `
}