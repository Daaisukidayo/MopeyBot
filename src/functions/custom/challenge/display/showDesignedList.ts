import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showDesignedList",
  description: "Displays the designed list of caught rare animals as the media gallery inside the V2 components.",
  params: [
    {
      name: "list",
      description: "Array of caught rare animals.",
      type: ArgType.Json
    }
  ],
  code: `
    $if[$jsonSize[list]==0;
      $arrayPush[list;$tl[ui.challenge.unknown.$jsonGet[userProfile;language]]]
    ]

    $let[imageName;row1]
    $attachment[res/img/challenge/$get[imageName].png;$get[imageName].png]

    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
    $addTextDisplay[# $arrayJoin[list; ]]
    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
  `
})
