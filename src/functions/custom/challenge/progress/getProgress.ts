import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getProgress",
  description: "the user's luck challenge progress",
  output: ArgType.Json,
  brackets: false,
  params: [
    {
      name: "userId",
      description: "the user's ID",
      type: ArgType.User,
      required: false,
    },
  ],
  code: `
    $jsonLoad[progress;$getUserVar[challengeProgress|$channelID;$nullish[$env[userId;id];$authorID]]]
    $c[old progress (pre ChallengeProgress) has no class name]
    $if[$and[$env[progress]!=;$isInstance[progress]==false];
      $!jsonSet[progress;__class;ChallengeProgress]
    ]
    $return[$env[progress]]
  `,
})
