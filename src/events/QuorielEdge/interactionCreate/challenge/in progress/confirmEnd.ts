import { Command } from "@quoriel/edge"

export default new Command({
  name: "confirmEndingChallenge",
  description: "When pressing 'Confirm' button",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$jsonGet[challengeProgress;started]==true;
      $!deleteMessage[$channelID;$messageID]
      $newError[$tl[ui.challenge.active.$get[l]]]
    ]

    $addChallengeCompletedContainer[$jsonGet[challengeProgress;raresList]]
    $interactionUpdate

    $!jsonSet[challengeProgress;endDate;$getTimestamp]
    $!jsonSet[challengeProgress;playType;$if[$jsonGet[challengeProgress;teamID]==-1;0;1]]
    $pushNewHistoryPage[$env[challengeProgress]]
    $finishChallenge[challengeProgress]
  `
})
