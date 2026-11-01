import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getProfile",
  description: "the user's profile as a UserProfile instance",
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
    $let[id;$nullish[$env[userId;id];$authorID]]
    $let[saved;$getUserVar[userProfile;$get[id]]]
    $if[$get[saved]==;
      $new[profile;UserProfile;$get[id]]
      $return[$env[profile]]
    ]

    $c[backfill fields added to the class later]
    $jsonLoad[profile;$get[saved]]
    $new[fresh;UserProfile;$get[id]]
    $objectDefaults[profile;$env[fresh]]
    $return[$env[profile]]
  `,
})
