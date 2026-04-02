export default {
  name: "showDesignedList",
  description: "Displays the designed list of caught rare animals as the media gallery inside the V2 components.",
  params: [
    {
      name: "l",
      description: "Array of caught rare animals.",
      type: "Json",
      required: true,
    }
  ],
  code: `
    $if[$arrayLength[l]==0;
      $arrayPush[l;$tl[ui.challenge.unknown]]
    ]

    $let[imageName;row1]
    $attachment[src/img/$get[imageName].png;$get[imageName].png]

    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
    $addTextDisplay[# $arrayJoin[l; ]]
    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
  `
}