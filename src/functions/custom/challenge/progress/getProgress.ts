import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getProgress",
  description: "Returns the user luck challenge progress.",
  output: ArgType.Json,
  brackets: false,
  params: [
    {
      name: "userId",
      description: "The user ID.",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $jsonLoad[progress;$getUserVar[challengeProgress|$channelID;$nullish[$env[userId;id];$authorID]]]
    $c[Progress saved before the ChallengeProgress class has no class name]
    $if[$and[$env[progress]!=;$isInstance[progress]==false];
      $!jsonSet[progress;__class;ChallengeProgress]
    ]
    $return[$env[progress]]
  `,
})
