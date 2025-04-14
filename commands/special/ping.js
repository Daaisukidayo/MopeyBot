module.exports = ({
  name: "ping",
  type: "messageCreate",
  code: `
    $reply
    
    $callFunction[checking;]

    $jsonLoad[l10n;$readFile[json/localisations.json]]

    $let[l10n;$getUserVar[l10n]]

    $let[desc1;$env[l10n;ping;pingDesc1;$get[l10n]]]
    $let[desc2;$env[l10n;ping;pingDesc2;$get[l10n]]]
    $let[descMS;$env[l10n;ping;pingMS;$get[l10n]]]

    $if[$get[desc1]==; $let[desc1;textNotFound]]
    $if[$get[desc2]==; $let[desc2;textNotFound]]
    $if[$get[descMS]==; $let[descMS;textNotFound]]

    **$get[desc1]: \`$ping\`$get[descMS]**\n**$get[desc2]: \`$floor[$executionTime]\`$get[descMS]** 
  `
})