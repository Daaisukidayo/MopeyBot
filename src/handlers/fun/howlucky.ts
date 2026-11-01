import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleHowlucky",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $c[rolled once a day, the profile keeps the number + desc till tomorrow]
    $if[$jsonGet[userProfile;howlucky;day]!=$calendarDay;
      $let[r;$random[0;100]]
      $c[thresholds go down to 0 so something always matches]
      $jsonLoad[luck;$arrayFind[$getGlobalVar[howluckyData];data;$get[r]>=$jsonGet[data;num]]]
      $objectMerge[userProfile;howlucky;$objectOf[day;$calendarDay;number;$get[r];desc;$jsonGet[luck;desc]]]
      $callMethod[userProfile;save]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.howlucky.description.$get[l];$jsonGet[userProfile;howlucky;number];$tl[data.howlucky.$jsonGet[userProfile;howlucky;desc].$get[l]]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.howlucky.footer.$get[l];$discordTimestamp[$math[$getTimestamp + $msUntilNextDay];RelativeTime]]]
    ;$getGlobalVar[luckyColor]]
  `,
})
