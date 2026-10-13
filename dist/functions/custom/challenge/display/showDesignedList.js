"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "showDesignedList",
    description: "Displays the designed list of caught rare animals as the media gallery inside the V2 components.",
    params: [
        {
            name: "list",
            description: "Array of caught rare animals.",
            type: forgescript_1.ArgType.Json
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
});
//# sourceMappingURL=showDesignedList.js.map