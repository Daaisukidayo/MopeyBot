module.exports = [{
  name: "backup", 
  type: "messageCreate",
  code: `
		$reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
		$jsonLoad[userBackup;$getUserVar[userBackup]]
		$let[arg;$toLowerCase[$message]]
		$onlyIf[$includes["$get[arg]";"load"];# If you want to load last save in case you lost your profile data, run \`$getGuildVar[prefix]backup load\`!]

		$color[$getGlobalVar[defaultColor]]
		$getGlobalVar[author]

		$!jsonSet[userProfile;$env[userBackup]]
		$setUserVar[userProfile;$env[userBackup]]
		$description[## Successfully loaded last backup!]
  `
}]