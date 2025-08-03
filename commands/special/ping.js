module.exports = ({
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;language]]

    $let[replace0;$ping]
    $let[replace1;$floor[$executionTime]]

    $loop[2; 
        $let[desc$env[i];$advancedReplace[$env[l10n;ping;pingDesc$env[i];$get[l10n]];{0};$get[replace0];{1};$get[replace1]]]
        $if[$get[desc$env[i]]==; $let[desc$env[i];textNotFound | ID: $get[l10n]$env[i]]] 
    ;i;true]

    **$get[desc1]**\n**$get[desc2]** 
  `
})