import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "showDesignedList",
  description: "Displays the designed list of caught rare animals as the media gallery inside the V2 components.",
  params: [
    {
      name: "_list",
      description: "Array of caught rare animals.",
      type: ArgType.Json,
    }
  ],
  code: `
    $if[$arrayLength[_list]==0;
      $arrayPush[_list;$tl[ui.challenge.unknown.$get[l]]]
    ]

    $let[imageName;row1]
    $attachment[res/img/custom/challenge/$get[imageName].png;$get[imageName].png]

    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
    $addTextDisplay[# $arrayJoin[_list; ]]
    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
  `
})