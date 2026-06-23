export default {
  name: 'handleTimezone',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
		$addCooldown

		$jsonLoad[timezones;$readFile[res/data/timezones.json]]

    $let[tz;$default[$option[new-timezone];$message]]
    

		$if[$get[tz]!=;
      $arrayLoad[tzParts;/;$get[tz]]

      $if[$arrayLength[tzParts]!=2;
        $newError[$tl[ui.timezone.invalid.$get[l]]]
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
				$saveProfile[$env[userProfile]]
			;
				$newError[$tl[ui.timezone.invalid.$get[l]]]
			]
    ]

		$addContainer[
			$addAuthorDisplay
			$addTextDisplay[$tl[ui.timezone.current.$get[l];$env[userProfile;timezone]]]
		;$getGlobalVar[defaultColor]]
  `
}