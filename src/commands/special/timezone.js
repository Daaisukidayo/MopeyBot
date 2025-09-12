import uniSnippets from "#snippets/universalSnippets.js"

export default {
  name: "timezone",
  aliases: ["tz"],
  type: "messageCreate",
  code: `
		$reply
    ${uniSnippets.checkProfile({time: '10s'})}
		$jsonLoad[timezones;$readFile[src/json/timezones.json]]

		$let[arg;$toLowerCase[$message]]
		$if[$get[arg]!=;
			$let[hasTZ;$arraySome[timezones;tz;$toLowerCase[$env[tz;zoneName]]==$get[arg]]]

			$if[$get[hasTZ];
        ${uniSnippets.checkProfile({time: '1w'})}
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