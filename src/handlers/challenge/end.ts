import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleEnd",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]

    $checkProfile
    $jsonLoad[challengeProgress;$getProgress]
    $isActiveChallenge[challengeProgress]

    $defer

    $addChallengeCompletedContainer[$jsonGet[challengeProgress;raresList]]
    $!send
    $finishChallenge[challengeProgress]
  `
})
