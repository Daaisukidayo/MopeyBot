module.exports = [{
	name: "testermode",
  aliases: ["tmode", "tm"],
	type: "messageCreate",
	code: `
    $reply
    $onlyForUsers[;$botOwnerID;254354531951837186;502840819380912139;757311258541162498;919218506279559198;928984728932077588]

    $let[arg;$advancedReplace[$toLowerCase[$message[0]];on;true;off;false]]

    $onlyIf[$or[$get[arg]==true;$get[arg]==false]]

    $if[$and[$getUserVar[testerMode]==true;$get[arg]==true];
      $let[desc;❌ You already have enabled tester mode!]
      $let[color;$getGlobalVar[errorColor]]
    ;$if[$and[$getUserVar[testerMode]==false;$get[arg]==false];
      $let[desc;❌ You already have disabled tester mode!]
      $let[color;$getGlobalVar[errorColor]]
    ;
      $setUserVar[testerMode;$get[arg]]
      $let[desc;✅ Successfully __$advancedReplace[$get[arg];true;enabled;false;disabled]__ tester mode!]
      $let[color;$getGlobalVar[luckyColor]]
    ]]

    $description[## $get[desc]]
    $getGlobalVar[author]
    $color[$get[color]]
  `
}]