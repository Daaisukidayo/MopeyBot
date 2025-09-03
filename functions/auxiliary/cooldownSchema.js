// REQUIRES LOADED USER PROFILE
export default {
  name: "cooldownSchema",
  params: ["name"],
  code: `
    $let[time;$getUserCooldownTime[$env[name]]]
    $let[cooldownEnd;$sum[$getTimestamp;$get[time]]]
    $let[longDateTime;$discordTimestamp[$get[cooldownEnd];LongDateTime]]
    $let[relativeTimeLeft;$discordTimestamp[$get[cooldownEnd];RelativeTime]]
    $if[$or[$get[time]>30000;$get[time]==0];
      $let[deleteTime;10000]
    ;
      $let[deleteTime;$get[time]]
    ]

    $jsonLoad[l;$readFile[json/localizations.json]]
    $let[language;$env[userProfile;language]]

    $let[content1;$default[$env[l;cooldown;0;$get[language]];???]]
    $let[content2;$default[$advancedReplace[$env[l;cooldown;1;$get[language]];{0};$get[relativeTimeLeft];{1};$get[longDateTime]];???]]

    $return[
      $getGlobalVar[author] $c[REQUIRES LOADED USER PROFILE]
      $title[$get[content1]]
      $description[$get[content2]]
      $color[$getGlobalVar[cooldownColor]]    
      $deleteIn[$get[deleteTime]]
    ]
  `
}