import { ForgeClassBuilder, ParamType } from "forge.class"

export default new ForgeClassBuilder({
  name: "PlaySession",
  fields: {
    "static baseArena": {
      turn: 0,
      player: {
        bites: 0,
      },
      opponent: {
        animal_id: null,
        animal_skin_id: null,
        tier: null,
        xp: null,
        action: null,
        bites: 0,
      },
    },

    path: null,
    screen: 0,
    is_started: false,
    is_dead: false,
    tier: 1,
    mope_coins: 0,
    xp: 0,
    biome: -1,
    animal_id: null,
    animal_skin_id: null,
    apex: [],
    arena: "$getStatic[PlaySession;baseArena]",
    held_soccer: null,

    dev: {
      immortal: false,
      forcedEvent: null,
      forcedSoccer: null,
      showAllRares: false,
    },
  },
  methods: {
    start: {
      params: [
        { name: "guildId", type: ParamType.Guild },
        { name: "channelId", type: ParamType.Channel },
        { name: "messageId", type: ParamType.Message },
      ],
      code: `
        $c[msg link format: guild/channel/message]
        $setField[this;path;$env[guildId;id]/$env[channelId;id]/$env[messageId;id]]
        $setField[this;is_started;true]
      `,
    },

    nextScreen: {
      code: `
        $c[components carry their screen number so stale ones can be spotted]
        $jsonMath[this;screen;1]
      `,
    },

    addXp: {
      params: [{ name: "amount", type: ParamType.Number }],
      code: `$jsonMath[this;xp;$round[$env[amount]]]`,
    },

    addCash: {
      params: [{ name: "amount", type: ParamType.Number }],
      code: `$jsonMath[this;mope_coins;$round[$env[amount]]]`,
    },

    updateTier: {
      code: `
        $c[each tier knows its start XP and the next tier's. past the last one the tier just stays put]
        $let[xp;$getField[this;xp]]
        $jsonLoad[tier;$arrayFind[$jsonEntries[$getGlobalVar[xpPerTier]];e;$inRange[$get[xp];$jsonGet[e;1;0];$math[$jsonGet[e;1;1] - 1]]]]
        $if[$env[tier]!=;$setField[this;tier;$jsonGet[tier;0]]]
      `,
    },

    restartTier: {
      code: `
        $c[back to the tier's min XP]
        $setField[this;xp;$jsonGet[$getGlobalVar[xpPerTier];$getField[this;tier];0]]
        $callMethod[this;resetArena]
      `,
    },

    "private loseXp": {
      code: `
        $if[$and[$getField[this;tier]==17;$includes[$toLowerCase[$jsonGet[this;animal_id]];king_dragon]];
          $setField[this;xp;0]
        ;
          $setField[this;xp;$floor[$math[$getField[this;xp] / $random[1.5;2.15;true]]]]
        ]
      `,
    },

    die: {
      code: `
        $setField[this;is_dead;true]
        $callMethod[this;loseXp]
        $callMethod[this;updateTier]
      `,
    },

    removeAllApex: {
      code: `
        $setField[this;apex;$arrayOf]
      `,
    },

    resetArena: {
      code: `
        $setField[this;arena;$getStatic[PlaySession;baseArena]]
      `,
    },

    meetOpponent: {
      params: [
        { name: "animalId", type: ParamType.String },
        { name: "skinId", type: ParamType.Number },
        { name: "tier", type: ParamType.Number },
        { name: "xp", type: ParamType.Number },
      ],
      code: `
        $objectMerge[this;arena;opponent;$objectOf[animal_id;$env[animalId];animal_skin_id;$env[skinId];tier;$env[tier];xp;$env[xp]]]
      `,
    },

    winArena: {
      params: [{ name: "opponentApex", type: ParamType.String }],
      code: `
        $callMethod[this;addXp;$jsonGet[this;arena;opponent;xp]]
        $callMethod[this;addCash;1000]

        $c[BD gets the opponent's apex, but only if it IS an apex (dev arena lets any tier in)]
        $if[$and[$getField[this;tier]==17;$includes[$toLowerCase[$jsonGet[this;animal_id]];king_dragon]==false;$arrayIncludes[$getGlobalVar[allApex];$env[opponentApex]]];
          $setField[this;apex;$arrayUnion[$getField[this;apex];$arrayOf[$env[opponentApex]]]]
        ]
        $callMethod[this;resetArena]
      `,
    },

    loseArena: {
      code: `
        $c[drop the XP before the animal, KD's loss depends on that order]
        $callMethod[this;die]
        $setField[this;animal_id;null]
        $setField[this;animal_skin_id;null]
        $callMethod[this;resetArena]
        $callMethod[this;removeAllApex]
      `,
    },

    evolveInto: {
      params: [
        { name: "animalId", type: ParamType.String },
        { name: "cash", type: ParamType.Number },
        { name: "skinId", type: ParamType.String },
      ],
      code: `
        $callMethod[this;removeAllApex]
        $callMethod[this;addCash;$env[cash]]

        $c[held soccer stays only if you're alive and still in the same biome]
        $let[biome;$getAnimalInfo[$env[animalId];biome]]
        $let[keepSoccer;$and[$jsonGet[this;held_soccer]!=;$getField[this;is_dead]==false;$getField[this;biome]==$get[biome]]]
        $if[$get[keepSoccer]==false;$callMethod[this;dropSoccer]]

        $setField[this;animal_id;$env[animalId]]
        $setField[this;animal_skin_id;$env[skinId]]
        $setField[this;biome;$get[biome]]
        $setField[this;is_dead;false]
        $return[$get[keepSoccer]]
      `,
    },

    dropSoccer: {
      code: `
        $setField[this;held_soccer;null]
      `,
    },

    soccerXp: {
      params: [
        { name: "soccerType", type: ParamType.String },
        { name: "soccerId", type: ParamType.Number },
      ],
      code: `
        $c[hold = % of the next tier's start XP, clamped to min/max, all scaled up for rarer soccers. goal = a multiple of that]
        $let[multiplier;$jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];xpMultiplier]]
        $let[tierMaxXp;$jsonGet[$getGlobalVar[xpPerTier];$getField[this;tier];1]]
        $let[xp;$max[$min[$math[$get[tierMaxXp] * $getGlobalVar[soccerHoldXpPercent] / 100];$getGlobalVar[soccerHoldMaxXp]];$getGlobalVar[soccerHoldMinXp]]]
        $return[$round[$math[$get[xp] * $get[multiplier]]]]
      `,
    },

    holdSoccer: {
      params: [
        { name: "soccerType", type: ParamType.String },
        { name: "soccerId", type: ParamType.Number },
        { name: "canLose", type: ParamType.Boolean, required: false },
      ],
      code: `
        $let[MC;$getSoccerMC[this;$env[soccerType];$env[soccerId];hold]]
        $let[XP;$callMethod[this;soccerXp;$env[soccerType];$env[soccerId]]]
        $if[$nullish[$env[canLose];true];
          $jsonLoad[lossChances;$getGlobalVar[soccerLossChances]]
          $let[stealChance;$getSoccerStealChance[this;$env[soccerType];$env[soccerId]]]
          $let[lossRoll;$random[1;1000]]
          $c[dev override for the hold outcome, one-shot]
          $switch[$jsonGet[this;dev;forcedSoccer];
            $case[stolen;$let[lossRoll;0]]
            $case[vanished;$let[lossRoll;$math[$get[stealChance] + 1]]]
            $case[failed;$let[lossRoll;1001]]
            $case[success;$let[lossRoll;1001]]
          ]
          $!jsonSet[this;dev;forcedSoccer;null]
          $if[$get[lossRoll]<=$math[$get[stealChance] + $jsonGet[lossChances;vanish]];
            $callMethod[this;dropSoccer]
            $return[$objectOf[outcome;$if[$get[lossRoll]<=$get[stealChance];stolen;vanished]]]
          ]
        ]
        $callMethod[this;addCash;$get[MC]]
        $callMethod[this;addXp;$get[XP]]
        $setField[this;held_soccer;$env[soccerType]_$env[soccerId]]
        $return[$objectOf[outcome;held;MC;$get[MC];XP;$get[XP]]]
      `,
    },
  },
})
