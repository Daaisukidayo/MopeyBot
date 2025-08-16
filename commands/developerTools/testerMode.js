export default {
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

    $switch[$get[arg];
      $case[on;
        $!jsonSet[userProfile;testerMode;true]
        $let[state;Enabled]
      ]

      $case[off;
        $!jsonSet[userProfile;testerMode;false]
        $let[state;Disabled]
      ]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator
      $addTextDisplay[## ✅ Successfully __$get[state]__ tester mode!]
    ;$getGlobalVar[defaultColor]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}