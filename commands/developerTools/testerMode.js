module.exports = [{
	name: "testermode",
  aliases: ["tmode", "tm"],
	type: "messageCreate",
	code: `
    $reply
    $jsonLoad[testers;$getGlobalVar[allTesterIDs]]
    $onlyIf[$or[$arrayIncludes[testers;$authorID];$authorID==$botOwnerID]]
    $jsonLoad[userProfile;$getUserVar[userProfile]]

    $let[arg;$toLowerCase[$message]]

    $onlyIf[$includes["$get[arg]";"on";"off"]]

    $let[hasTesterMode;$env[userProfile;testerMode]]
    $let[state;$advancedReplace[$get[arg];on;enabled;off;disabled]]

    $if[$and[$get[hasTesterMode]==true;$get[arg]==on];
      $let[desc;❌ You already have enabled tester mode!]
      $let[color;$getGlobalVar[errorColor]]
    ;
      $if[$and[$get[hasTesterMode]==false;$get[arg]==off];
        $let[desc;❌ You already have disabled tester mode!]
        $let[color;$getGlobalVar[errorColor]]
      ;
        $!jsonSet[userProfile;testerMode;$get[arg]]
        $setUserVar[userProfile;$env[userProfile]]
        $let[desc;✅ Successfully __$get[state]__ tester mode!]
        $let[color;$getGlobalVar[luckyColor]]
      ]
    ]

    $addContainer[
      $callFunction[author]
      $addSeparator
      $addTextDisplay[## $get[desc]]
    ;$get[color]]

  `
}]