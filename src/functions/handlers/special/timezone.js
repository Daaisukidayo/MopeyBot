export default {
  name: 'handleTimezone',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
		$addCooldown

		$jsonLoad[timezones;$readFile[src/json/timezones.json]]

    $let[tz;$default[$option[new];$message]]
    

		$if[$get[tz]!=;
      $arrayLoad[tzParts;/;$get[tz]]

      $if[$arrayLength[tzParts]!=2;
        $newError[$tl[ui.timezone.invalid]]
      ]

      $arrayMap[tzParts;part;$return[$toTitleCase[$env[part]]];tzParts]
			$let[tzExists;$arraySome[timezones;tz;$toLowerCase[$env[tz;zoneName]]==$toLowerCase[$get[tz]]]]

			$if[$get[tzExists];
        $if[$env[userProfile;devMode]==0;
          $cooldown[setTimezone-$authorID;1w;
            $newCooldown[$getCooldownTime[setTimezone-$authorID]]
          ]
        ]
				$!jsonSet[userProfile;timezone;$arrayJoin[tzParts;/]]
				$saveProfile
			;
				$newError[$tl[ui.timezone.invalid]]
			]
    ]

		$addContainer[
			$addAuthorDisplay
			$addTextDisplay[$tl[ui.timezone.current;$env[userProfile;timezone]]]
		;$getGlobalVar[defaultColor]]
		$send
  `
}