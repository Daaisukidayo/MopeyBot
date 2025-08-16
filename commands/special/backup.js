export default {
  name: "backup", 
  type: "messageCreate",
  code: `
		$reply
    $stop
    $jsonLoad[userProfile;$getUserVar[userProfile]]
		$jsonLoad[userBackup;$getUserVar[userBackup]]
		$let[arg;$toLowerCase[$message]]
		$onlyIf[$includes["$get[arg]";"load"];
      $description[# If you want to load your last save in case you lost your profile data, run \`$getGuildVar[prefix]backup load\`!]
      $author[✖️ Error!]
      $color[$getGlobalVar[errorColor]]
		]
    $onlyIf[$env[userBackup;MUID]!=;
      $description[# You don't have any saved backup!]
      $author[✖️ Error!]
      $color[$getGlobalVar[errorColor]]
    ]

		$!jsonSet[userProfile;$env[userBackup]]
		$setUserVar[userProfile;$env[userBackup]]

		$color[$getGlobalVar[defaultColor]]
		$getGlobalVar[author]
		$description[## Successfully loaded last backup!]
  `
}