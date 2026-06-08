"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleChart',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $c[
      $if[$toLowerCase[$default[$option[type];$message[0]]]==event;
        $let[img;https://media.discordapp.net/attachments/701793335941136464/1398666514663739474/eventluckchart.png]
        $let[time;1753213440000]
      ;
        $let[img;https://media.discordapp.net/attachments/701793335941136464/1403754359107354744/luckchart.png]
        $let[time;1754664900000]
      ]
    ]

    $let[img;https://media.discordapp.net/attachments/701793335941136464/1403754359107354744/luckchart.png]
    $let[time;1754664900000]

    $addContainer[
      $addMediaGallery[
        $addMediaItem[$get[img]]
      ]
      $addTextDisplay[$discordTimestamp[$get[time];LongDateTime]]
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=chart.js.map