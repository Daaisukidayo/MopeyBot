import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showDesignedList",
  description: "shows the caught rares list as a media gallery inside V2 components",
  params: [
    {
      name: "list",
      description: "array of caught rares",
      type: ArgType.Json,
    },
  ],
  code: `
    $if[$jsonSize[list]==0;
      $arrayPush[list;$tl[ui.challenge.unknown.$jsonGet[userProfile;language]]]
    ]

    $let[imageName;row1]
    $attachment[res/assets/challenge/$get[imageName].png;$get[imageName].png]

    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
    $addTextDisplay[# $arrayJoin[list; ]]
    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
  `,
})
