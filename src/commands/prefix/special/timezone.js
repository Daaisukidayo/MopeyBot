export default {
  name: "timezone",
  aliases: ["tz"],
  type: "messageCreate",
  code: `
		$reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
		$addCooldown[10s]

		$jsonLoad[timezones;$readFile[src/json/timezones.json]]

		$let[arg;$toLowerCase[$message]]
		$if[$get[arg]!=;
			$let[hasTZ;$arraySome[timezones;tz;$toLowerCase[$env[tz;zoneName]]==$get[arg]]]

			$if[$get[hasTZ];
        $addCooldown[1w]
				$!jsonSet[userProfile;timezone;$get[arg]]
				$saveProfile
				${embed()}
			;
				$newError[$tl[ui.timezone.invalid]]
			]
		;
      ${embed()}
    ]
	`
}

function embed() {
	return `
    $addContainer[
			$addAuthorDisplay
			$addTextDisplay[$tl[ui.timezone.current;$env[userProfile;timezone]]]
		;$getGlobalVar[defaultColor]]
  `
}