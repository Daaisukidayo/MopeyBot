import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addAuthorDisplay",
  description: "Adds an text display to the embed, showing the author's username and MUID.",
  brackets: false,
  params: [
    {
      name: "withAvatar",
      description: "Whether to show the user avatar as thumbnail (default: true).",
      type: ArgType.Boolean,
      required: false
    }
  ],
  code: `
    $c[A user who accepted the rules has a MUID after the name]
    $let[name;# \`$username[$jsonGet[userProfile;ID]]$if[$jsonGet[userProfile;acceptedRules];#$jsonGet[userProfile;MUID]]\`]

    $if[$nullish[$env[withAvatar];true];
      $addSection[
        $addTextDisplay[$get[name]]
        $addThumbnail[$userAvatar[$jsonGet[userProfile;ID];4096]]
      ]
    ;
      $addTextDisplay[$get[name]]
    ]
    $addSeparator[Large]
  `
})
