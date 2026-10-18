import { ForgeClassBuilder, ParamType } from "forge.class"

export default new ForgeClassBuilder({
  name: "ChallengeProgress",
  fields: {
    started: true,
    paused: false,
    points: 0,
    rares: 0,
    userID: null,
    teamID: -1,
    difficulty: "$getGlobalVar[defaultDifficulty]",
    raresList: {},
    events: [],
  },
  methods: {
    constructor: {
      params: [
        { name: "userId", type: ParamType.User },
        { name: "teamId", type: ParamType.Number },
        { name: "difficulty", type: ParamType.Number },
      ],
      code: `
        $setField[this;userID;$env[userId;id]]
        $setField[this;teamID;$env[teamId]]
        $setField[this;difficulty;$env[difficulty]]
      `,
    },

    "private recount": `
      $jsonLoad[totals;$sumRaresList[$getField[this;raresList]]]
      $setField[this;points;$jsonGet[totals;points]]
      $setField[this;rares;$jsonGet[totals;rares]]
    `,

    addRares: {
      params: [
        { name: "seconds", type: ParamType.Number },
        { name: "animalIds", type: ParamType.Json },
      ],
      code: `
        $c[Limits per difficulty (see cacheAllRares)]
        $getCache[rares;categoryLimits;categoryLimits]
        $let[difficulty;$getField[this;difficulty]]

        $jsonLoad[caught;$objectOf]
        $arrayLoad[reachedLimit]
        $let[points;0]

        $arrayForEach[animalIds;animalId;
          $jsonLoad[rare;$getChallengeRare[$env[animalId]]]
          $let[limit;$jsonGet[categoryLimits;$get[difficulty];$jsonGet[rare;category]]]
          $let[count;$default[$jsonGet[this;raresList;$env[animalId]];0]]

          $c[An unlimited rare is always added, a limited one only below its limit]
          $if[$or[$get[limit]==;$get[count]<$get[limit]];
            $letSum[points;$jsonGet[rare;points]]
            $jsonMath[caught;$env[animalId];points;$jsonGet[rare;points]]
            $jsonMath[caught;$env[animalId];quantity;1]
            $jsonMath[this;raresList;$env[animalId];1]

            $if[$math[$get[count] + 1]==$get[limit];
              $arrayPush[reachedLimit;$env[animalId]]
            ]
          ]
        ]

        $c[Totals come from the whole list, every message that adds is an event for the prediction]
        $if[$get[points]>0;
          $callMethod[this;recount]
          $arrayPushAt[this;events;$arrayOf[$env[seconds];$getField[this;points]]]
        ]
        $return[$objectOf[points;$get[points];caught;$env[caught];reachedLimit;$env[reachedLimit]]]
      `,
    },

    setRareCount: {
      params: [
        { name: "animalId", type: ParamType.String },
        { name: "count", type: ParamType.Number },
      ],
      code: `
        $c[Nothing left removes the rare. A count above the limit becomes the limit]
        $if[$env[count]<=0;
          $!jsonDelete[this;raresList;$env[animalId]]
        ;
          $!jsonSet[this;raresList;$env[animalId];$limitRareCount[$env[count];$env[animalId];$getField[this;difficulty]]]
        ]
        $callMethod[this;recount]
        $return[$default[$jsonGet[this;raresList;$env[animalId]];0]]
      `,
    },

    trimEvents: {
      params: [{ name: "seconds", type: ParamType.Number }],
      code: `
        $setField[this;events;$arrayFilter[$getField[this;events];event;$env[seconds]>$jsonGet[event;0]]]
      `,
    },

    historyPage: `
      $c[A team progress was played in a lobby]
      $return[$objectOf[points;$getField[this;points];rares;$getField[this;rares];endDate;$getTimestamp;playType;$if[$getField[this;teamID]==-1;0;1];difficulty;$getField[this;difficulty];raresList;$getField[this;raresList]]]
    `,
  },
})
