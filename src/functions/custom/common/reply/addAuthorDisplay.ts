import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addAuthorDisplay",
  description: "adds a text w/ the author's username and MUID",
  brackets: false,
  params: [
    {
      name: "withAvatar",
      description: "show the avatar as a thumbnail (default true)",
      type: ArgType.Boolean,
      required: false,
    },
  ],
  code: `
    $c[accepted the rules = MUID after the name]
    $let[name;# \`$username[$jsonGet[userProfile;user_id]]$if[$jsonGet[userProfile;verified];#$jsonGet[userProfile;muid]]\`]

    $if[$nullish[$env[withAvatar];true];
      $addSection[
        $addTextDisplay[$get[name]]
        $addThumbnail[$userAvatar[$jsonGet[userProfile;user_id];4096]]
      ]
    ;
      $addTextDisplay[$get[name]]
    ]
    $addSeparator[Large]
  `,
})
