export default {
  name: "showDesignedList",
  description: "Displays the designed list of caught rare animals as the media gallery inside the V2 components.",
  params: [
    {
      name: "list",
      description: "List of caught rare animals.",
      type: "Array",
      required: true,
    }
  ],
  code: `
    $jsonLoad[list;$env[list]]
    $if[$arrayLength[list]==0;
      $arrayPush[list;$tl[ui.challenge.unknown]]
    ]

    $addMediaGallery[$addMediaItem[https://i.postimg.cc/65z7tRMd/upperRow.png]]
    $addTextDisplay[# $arrayJoin[list;\n# ]]
    $addMediaGallery[$addMediaItem[https://i.postimg.cc/yY7JMny1/lowerRow.png]]
  `
}