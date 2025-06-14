module.exports = [{ 
  name: "credits", 
  aliases: ["owners"], 
  type: "messageCreate", 
  code: `
    $reply
    $let[cdTime;5s]
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[l10n;$readFile[json/localizations.json]]
    $let[l10n;$env[userProfile;l10n]]
    $loop[6; 
        $let[desc$env[i];$env[l10n;credits;creditsDesc$env[i];$get[l10n]]] 
        $if[$get[desc$env[i]]==; $let[desc1;textNotFound | ID: $get[l10n]$env[i]]] 
    ;i;desc]

    $title[__$get[desc6]__]
    $description[**$get[desc1]: $username[485453670729646090]
    $get[desc5]: $username[485453670729646090]
    $get[desc2]: $username[588624194032500747]
    $get[desc3]: $username[502840819380912139], $username[254354531951837186]**]
    $color[$getGlobalVar[defaultColor]]
    $footer[$get[desc4]]
  `
}]