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

    $c[The luck is rolled once a day: the profile keeps the number and its description until the next day]
    $if[$jsonGet[userProfile;limiters;lastHLUsed]!=$calendarDay;
      $let[r;$random[0;100]]
      $c[The thresholds go down to 0, so one always matches]
      $jsonLoad[luck;$arrayFind[$getGlobalVar[howluckyData];data;$get[r]>=$jsonGet[data;num]]]
      $objectMerge[userProfile;limiters;$objectOf[lastHLUsed;$calendarDay;HLRandom;$get[r];luckDesc;$jsonGet[luck;desc]]]
      $saveProfile[$env[userProfile]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.howlucky.description.$get[l];$jsonGet[userProfile;limiters;HLRandom];$tl[data.howlucky.$jsonGet[userProfile;limiters;luckDesc].$get[l]]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.howlucky.footer.$get[l];$discordTimestamp[$math[$getTimestamp + $msUntilNextDay];RelativeTime]]]
    ;$getGlobalVar[luckyColor]]
  `,
})
