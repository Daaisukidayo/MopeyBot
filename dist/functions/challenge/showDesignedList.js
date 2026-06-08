"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "showDesignedList",
    description: "Displays the designed list of caught rare animals as the media gallery inside the V2 components.",
    params: [
        {
            name: "_list",
            description: "Array of caught rare animals.",
            type: "Json",
            required: true,
        }
    ],
    code: `
    $if[$arrayLength[_list]==0;
      $arrayPush[_list;$tl[$get[l];ui;challenge.unknown]]
    ]

    $let[imageName;row1]
    $attachment[res/img/$get[imageName].png;$get[imageName].png]

    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
    $addTextDisplay[# $arrayJoin[_list; ]]
    $addMediaGallery[$addMediaItem[attachment://$get[imageName].png]]
  `
};
//# sourceMappingURL=showDesignedList.js.map