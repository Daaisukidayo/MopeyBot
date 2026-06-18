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
        $newError[$tl[$get[l];ui;timezone.invalid]]
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
				$newError[$tl[$get[l];ui;timezone.invalid]]
			]
    ]

		$addContainer[
			$addAuthorDisplay
			$addTextDisplay[$tl[$get[l];ui;timezone.current;$env[userProfile;timezone]]]
		;$getGlobalVar[defaultColor]]
  `
}