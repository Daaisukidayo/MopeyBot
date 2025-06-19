module.exports = [{
  name: "newleaderboard",
  aliases: ["nlb", "ntop"],
  type: "messageCreate",
  code: `
    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
    $arrayMap[allUserIDs;id;
      $jsonLoad[userProfile;$getUserVar[userProfile;$env[id]]]
      $return[$env[userProfile]]
    ;profiles]
    $arrayAdvancedSort[profiles;A;B;
      $math[$env[B;MC] - $env[A;MC]]
    ;result]
    $log[$env[result]]
  `
}]