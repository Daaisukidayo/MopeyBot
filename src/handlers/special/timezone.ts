import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleTimezone",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown

    $let[tz;$default[$option[new-timezone];$message]]

    $c[any tz from the list, case-insensitive, saved in the list's spelling. changeable once a week]
    $if[$get[tz]!=;
      $let[zoneName;$jsonGet[$arrayFind[$readFile[res/data/timezones.json];zone;$toLowerCase[$jsonGet[zone;zoneName]]==$toLowerCase[$get[tz]]];zoneName]]
      $onlyIf[$get[zoneName]!=;
        $newError[$tl[ui.timezone.invalid.$get[l]]]
      ]

      $if[$isDev==false;
        $cooldown[setTimezone-$authorID;1w;
          $newCooldown[$getCooldownTime[setTimezone-$authorID]]
        ]
      ]
      $!jsonSet[userProfile;timezone;$get[zoneName]]
      $callMethod[userProfile;save]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.timezone.current.$get[l];$jsonGet[userProfile;timezone]]]
    ;$getGlobalVar[defaultColor]]
  `,
})
