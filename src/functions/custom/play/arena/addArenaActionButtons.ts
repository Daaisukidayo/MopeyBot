import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addArenaActionButtons",
  description: "adds the arena action buttons",
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $addActionRow
    $arrayForEach[$getGlobalVar[arenaActions];elem;
      $addButton[play_arenaAction-$jsonGet[elem;id]-$playID[playData];$tl[data.arenaActions.$jsonGet[elem;id].$get[l]];Success;$jsonGet[elem;emoji]]
    ]
  `,
})
