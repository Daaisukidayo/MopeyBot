import { ForgeClassBuilder } from "forge.class"

export default new ForgeClassBuilder({
  name: "Lobby",
  fields: {
    host: "null",
    messageID: "null",
    started: false,
    settings: "$objectOf[mode;0;difficulty;$getGlobalVar[defaultDifficulty];victoryType;0]",
    ready: "[]",
    allPlayers: "[]",
    teams: "[]",
  },
  methods: {
    constructor: {
      params: ["host"],
      code: `
        $setField[this;host;$env[host]]
        $setField[this;allPlayers;$arrayOf[$env[host]]]
        $setField[this;teams;$arrayOf[$objectOf[teamID;0;players;$arrayOf[$env[host]]]]]
      `,
    },

    players: `
      $return[$arrayUnique[$getField[this;allPlayers]]]
    `,

    "private isPlayer": {
      params: ["userId"],
      code: `$return[$arrayIncludes[$getField[this;allPlayers];$env[userId]]]`,
    },

    teamOf: {
      params: ["userId"],
      code: `$return[$arrayFindIndex[$getField[this;teams];team;$arrayIncludes[$jsonGet[team;players];$env[userId]]]]`,
    },

    hostCandidates: `
      $return[$arrayDiff[$callMethod[this;players];$arrayOf[$getField[this;host]]]]
    `,

    canStart: `
      $jsonLoad[ready;$getField[this;ready]]
      $return[$and[$jsonSize[this;allPlayers]>$jsonSize[this;teams];$arrayEvery[$getField[this;allPlayers];ID;$arrayIncludes[ready;$env[ID]]];$arraySome[$getField[this;teams];team;$jsonSize[team;players]==0]==false]]
    `,

    join: {
      params: ["userId", { name: "team", type: "Number" }, { name: "tester", type: "Boolean" }],
      code: `
        $let[l;$jsonGet[userProfile;language]]
        $let[isPlayer;$callMethod[this;isPlayer;$env[userId]]]

        $c[A full lobby still lets its players switch teams. A tester adds an entry, so it needs a free place]
        $onlyIf[$or[$and[$get[isPlayer];$env[tester]==false];$jsonSize[this;allPlayers]<$getGlobalVar[maxLobbyParticipants]];
          $newError[$tl[ui.lobby.lobbyFull.$get[l]]]
        ]

        $c[Testers may join any team repeatedly to try the lobby alone: every join adds an entry]
        $onlyIf[$or[$env[tester];$arrayIncludes[$jsonGet[this;teams;$env[team];players];$env[userId]]==false];
          $newError[$tl[ui.lobby.alreadyInTeam.$get[l]]]
        ]

        $c[Everyone else switches teams]
        $let[oldTeam;$callMethod[this;teamOf;$env[userId]]]
        $if[$and[$get[oldTeam]!=-1;$env[tester]==false];
          $!jsonSet[this;teams;$get[oldTeam];players;$arrayFilter[$jsonGet[this;teams;$get[oldTeam];players];ID;$env[ID]!=$env[userId]]]
        ]
        $arrayPushAt[this;teams;$env[team];players;$env[userId]]

        $c[One entry per team entry (a tester gets one per join)]
        $if[$or[$env[tester];$get[isPlayer]==false];
          $arrayPushAt[this;allPlayers;$env[userId]]
        ]
      `,
    },

    quit: {
      params: ["userId", { name: "team", type: "Number" }],
      code: `
        $let[l;$jsonGet[userProfile;language]]
        $onlyIf[$callMethod[this;isPlayer;$env[userId]];
          $newError[$tl[ui.lobby.notParticipant.$get[l]]]
        ]

        $c[Quit only works on the team whose button was pressed]
        $jsonLoad[players;$jsonGet[this;teams;$env[team];players]]
        $onlyIf[$arrayIncludes[players;$env[userId]];
          $newError[$tl[ui.lobby.notInThisTeam.$get[l]]]
        ]
        $!arraySplice[players;$arrayIndexOf[players;$env[userId]];1]
        $!jsonSet[this;teams;$env[team];players;$env[players]]

        $c[Each quit removes one entry. A tester stays ready while any entry is left]
        $jsonLoad[allPlayers;$getField[this;allPlayers]]
        $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$env[userId]];1]
        $setField[this;allPlayers;$env[allPlayers]]
        $if[$arrayIncludes[allPlayers;$env[userId]]==false;
          $setField[this;ready;$arrayFilter[$getField[this;ready];ID;$env[ID]!=$env[userId]]]
        ]
      `,
    },

    toggleReady: {
      params: ["userId"],
      code: `
        $let[l;$jsonGet[userProfile;language]]
        $onlyIf[$callMethod[this;isPlayer;$env[userId]];
          $newError[$tl[ui.lobby.notParticipant.$get[l]]]
        ]

        $jsonLoad[ready;$getField[this;ready]]
        $if[$arrayIncludes[ready;$env[userId]];
          $arrayRemove[ready;$env[userId]]
        ;
          $arrayPush[ready;$env[userId]]
        ]
        $setField[this;ready;$env[ready]]
      `,
    },

    changeSetting: {
      params: ["setting", "value"],
      code: `
        $switch[$env[setting];
          $case[host;
            $setField[this;host;$env[value]]
          ]
          $case[mode;
            $c[A new mode starts with empty teams, numbered from 0, and nobody in them]
            $setField[this;teams;$arrayMap[$arrayRange[0;$env[value]];teamID;$return[$objectOf[teamID;$env[teamID];players;$arrayOf]]]]
            $setField[this;ready;$arrayOf]
            $setField[this;allPlayers;$arrayOf]
            $!jsonSet[this;settings;mode;$env[value]]
          ]
          $case[default;
            $!jsonSet[this;settings;$env[setting];$env[value]]
          ]
        ]
      `,
    },
  },
})
