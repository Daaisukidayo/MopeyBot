module.exports = {
  name: "timezone",
  aliases: ["tz"],
  type: "messageCreate",
  code: `
		$reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]
		$jsonLoad[timezones;$readFile[json/timezones.json]]

		$let[arg;$toLowerCase[$message]]
		$if[$get[arg]!=;
			$let[hasTZ;$arraySome[timezones;tz;$toLowerCase[$env[tz;zoneName]]==$get[arg]]]

			$if[$get[hasTZ];
        $callFunction[cooldown;1w]
				$!jsonSet[userProfile;timezone;$get[arg]]
				${embed()}
				$setUserVar[userProfile;$env[userProfile]]
			;
				$callFunction[embed;error]
				$description[## Invalid timezone!]
			]
		;
      ${embed()}
    ]
	`
}

function embed() {
	return `
    $callFunction[embed;default]
		$description[### Your current timezone: \`$env[userProfile;timezone]\`]
  `
}