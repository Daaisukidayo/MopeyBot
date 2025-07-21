module.exports = [{
	name: "testermode",
  aliases: ["tmode", "tm"],
	type: "messageCreate",
	code: `
    $reply
    $jsonLoad[testers;$getGlobalVar[allTesterIDs]]
    $onlyIf[$arrayIncludes[testers;$authorID]]

    $let[arg;$advancedReplace[$toLowerCase[$message[0]];on;true;off;false]]

    $onlyIf[$or[$get[arg]==true;$get[arg]==false]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $if[$and[$env[userProfile;testerMode]==true;$get[arg]==true];
      $let[desc;❌ You already have enabled tester mode!]
      $let[color;$getGlobalVar[errorColor]]
    ;$if[$and[$env[userProfile;testerMode]==false;$get[arg]==false];
      $let[desc;❌ You already have disabled tester mode!]
      $let[color;$getGlobalVar[errorColor]]
    ;
      $!jsonSet[userProfile;testerMode;$get[arg]]
      $setUserVar[userProfile;$env[userProfile]]
      $let[desc;✅ Successfully __$advancedReplace[$get[arg];true;enabled;false;disabled]__ tester mode!]
      $let[color;$getGlobalVar[luckyColor]]
    ]]

    $description[## $get[desc]]
    $getGlobalVar[author]
    $color[$get[color]]
  `
}]