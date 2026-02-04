export default {
  name: "backup", 
  type: "messageCreate",
  code: `
		$reply
    $stop
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
		$jsonLoad[userBackup;$getUserVar[userBackup]]
		$let[arg;$toLowerCase[$message]]
		$onlyIf[$includes["$get[arg]";"load"];
      $newError[If you want to load your last save in case you lost your profile, run \`$getGuildVar[prefix]backup load\`!]
		]
    $onlyIf[$env[userBackup;MUID]!=;
      $newError[You don't have any saved backup!]
    ]

		$!jsonSet[userProfile;$env[userBackup]]
		$saveProfile

		$addContainer[
      $addAuthorDisplay
      $addTextDisplay[## Successfully loaded last backup!]
    ;$getGlobalVar[defaultColor]]
  `
}