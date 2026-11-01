import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addArenaDevMenu",
  description: "adds dev menus to set both sides' arena bites (tester mode only)",
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $if[$jsonGet[userProfile;tester];;$return]

    $jsonLoad[bitesOptions;$arrayRange[0;10]]

    $addActionRow
    $addStringSelectMenu[play_devActions-arenaBites-$playID[playData];Dev: my bites (now $jsonGet[playData;arena;player;bites])]
    $arrayForEach[bitesOptions;count;
      $addOption[$env[count];$if[$env[count]==10;Win on the next action];$env[count];🦷]
    ]

    $addActionRow
    $addStringSelectMenu[play_devActions-arenaOpponentBites-$playID[playData];Dev: opponent bites (now $jsonGet[playData;arena;opponent;bites])]
    $arrayForEach[bitesOptions;count;
      $addOption[$env[count];$if[$env[count]==10;Lose on the next action];$env[count];🩸]
    ]
  `,
})
