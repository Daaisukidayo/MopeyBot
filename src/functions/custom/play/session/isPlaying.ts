import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "isPlaying",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $c[The game goes on in this very message]
    $onlyIf[$and[$jsonGet[playData;started];$jsonGet[playData;MessageID]==$messageID;$jsonGet[playData;ChannelID]==$channelID];$interactionFail]

    $c[A held soccer removed from the game is dropped]
    $if[$jsonGet[playData;heldSoccer]!=;
      $arrayLoad[heldSoccer;_;$jsonGet[playData;heldSoccer]]
      $if[$getPlaySoccer[$jsonGet[heldSoccer;0];$jsonGet[heldSoccer;1]]==;
        $!jsonDelete[playData;heldSoccer]
      ]
    ]
  `
})
