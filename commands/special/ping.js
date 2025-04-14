module.exports = ({
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    
    $callFunction[checking;]

    $jsonLoad[l10n;$readFile[json/localizations.json]]

    $let[l10n;$getUserVar[l10n]]

    $loop[3; 
        $let[desc$env[i];$env[l10n;ping;pingDesc$env[i];$get[l10n]]] 
        $if[$get[desc$env[i]]==; $let[desc1;textNotFound | ID: $get[l10n]$env[i]]] 
    ;i;desc]

    **$get[desc1]: \`$ping\`$get[desc3]**\n**$get[desc2]: \`$floor[$executionTime]\`$get[desc3]** 
  `
})