module.exports = [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $jsonLoad[allUserIDs;$getGlobalVar[allUserIDs]]
    $arrayMap[allUserIDs;id;
      $jsonLoad[userProfile;$getUserVar[userProfile;$env[id]]]
      $return[$env[userProfile]]
    ;profiles]
    $arrayAdvancedSort[profiles;A;B;
      $return[$math[$env[A;MC] - $env[B;MC]]]
    ;result]
    $log[result]
  `
}]