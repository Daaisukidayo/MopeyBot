module.exports = [{ 
  name: "credits", 
  aliases: ["owners"], 
  type: "messageCreate", 
  code: `
    $reply

    $let[cdTime;5s]
    $callFunction[checking;]
    $callFunction[cooldown;$get[cdTime]]

    $jsonLoad[l10n;$readFile[json/localizations.json]]

    $let[l10n;$getUserVar[l10n]]

    $let[desc1;$env[l10n;credits;creditsDesc1;$get[l10n]]]
    $let[desc2;$env[l10n;credits;creditsDesc2;$get[l10n]]]
    $let[desc3;$env[l10n;credits;creditsDesc3;$get[l10n]]]
    $let[desc4;$env[l10n;credits;creditsDesc4;$get[l10n]]]
    $let[desc5;$env[l10n;credits;creditsDesc5;$get[l10n]]]
    $let[desc6;$env[l10n;credits;creditsDesc6;$get[l10n]]]

    $if[$get[desc1]==; $let[desc1;textNotFound]]
    $if[$get[desc2]==; $let[desc2;textNotFound]]
    $if[$get[desc3]==; $let[desc3;textNotFound]]
    $if[$get[desc4]==; $let[desc4;textNotFound]]
    $if[$get[desc5]==; $let[desc5;textNotFound]]
    $if[$get[desc6]==; $let[desc6;textNotFound]]


    $title[__$get[desc6]__]
    $description[**$get[desc1]: $username[485453670729646090]
    $get[desc5]: $username[485453670729646090]
    $get[desc2]: $username[588624194032500747]
    $get[desc3]: $username[502840819380912139], $username[254354531951837186]**]
    $color[ffd700]
    $footer[$get[desc4]]
  `
}]