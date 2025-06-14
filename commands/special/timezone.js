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
			$let[hasTZ;$arraySome[timezones;tz;
				$if[$toLowerCase[$env[tz;zoneName]]==$get[arg];
					$return[true]
				;
					$return[false]
				]
			]]

			$if[$get[hasTZ];
        $callFunction[cooldown;1w]
				$!jsonSet[userProfile;timezone;$get[arg]]
				${embed()}
				$setUserVar[userProfile;$env[userProfile]]
				$sendMessage[$channelID]
			;
				$author[✖️ Error!]
				$color[$getGlobalVar[errorColor]]
				$description[## Invalid timezone!]
				$sendMessage[$channelID]
			]

		;

		${embed()}

    ]

	`
}

function embed() {
	return `
		$description[### Your current timezone: \`$env[userProfile;timezone]\`]
		$getGlobalVar[author]
		$color[$getGlobalVar[defaultColor]]`
}