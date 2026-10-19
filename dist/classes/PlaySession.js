"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge_class_1 = require("forge.class");
exports.default = new forge_class_1.ForgeClassBuilder({
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
                { name: "guildId", type: forge_class_1.ParamType.Guild },
                { name: "channelId", type: forge_class_1.ParamType.Channel },
                { name: "messageId", type: forge_class_1.ParamType.Message },
            ],
            code: `
        $c[The game message as in its link: guild/channel/message]
        $setField[this;path;$env[guildId;id]/$env[channelId;id]/$env[messageId;id]]
        $setField[this;is_started;true]
      `,
        },
        addXp: {
            params: [{ name: "amount", type: forge_class_1.ParamType.Number }],
            code: `$jsonMath[this;xp;$round[$env[amount]]]`,
        },
        addCash: {
            params: [{ name: "amount", type: forge_class_1.ParamType.Number }],
            code: `$jsonMath[this;mope_coins;$round[$env[amount]]]`,
        },
        updateTier: `
      $c[Every tier holds its first XP and the first XP of the next tier. Past the last tier the tier stays]
      $let[xp;$getField[this;xp]]
      $jsonLoad[tier;$arrayFind[$jsonEntries[$getGlobalVar[xpPerTier]];e;$inRange[$get[xp];$jsonGet[e;1;0];$math[$jsonGet[e;1;1] - 1]]]]
      $if[$env[tier]!=;$setField[this;tier;$jsonGet[tier;0]]]
    `,
        restartTier: `
      $c[The tier starts again from its lowest XP]
      $setField[this;xp;$jsonGet[$getGlobalVar[xpPerTier];$getField[this;tier];0]]
      $callMethod[this;resetArena]
    `,
        "private loseXp": `
      $if[$and[$getField[this;tier]==17;$includes[$toLowerCase[$jsonGet[this;animal_id]];king_dragon]];
        $setField[this;xp;0]
      ;
        $setField[this;xp;$floor[$math[$getField[this;xp] / $random[1.5;2.15;true]]]]
      ]
    `,
        die: `
      $setField[this;is_dead;true]
      $callMethod[this;loseXp]
      $callMethod[this;updateTier]
    `,
        removeAllApex: `$setField[this;apex;$arrayOf]`,
        resetArena: `$setField[this;arena;$getStatic[PlaySession;baseArena]]`,
        meetOpponent: {
            params: [
                { name: "animalId", type: forge_class_1.ParamType.String },
                { name: "skinId", type: forge_class_1.ParamType.Number },
                { name: "tier", type: forge_class_1.ParamType.Number },
                { name: "xp", type: forge_class_1.ParamType.Number },
            ],
            code: `
        $objectMerge[this;arena;opponent;$objectOf[animal_id;$env[animalId];animal_skin_id;$env[skinId];tier;$env[tier];xp;$env[xp]]]
      `,
        },
        winArena: {
            params: [{ name: "opponentApex", type: forge_class_1.ParamType.String }],
            code: `
        $callMethod[this;addXp;$jsonGet[this;arena;opponent;xp]]
        $callMethod[this;addCash;1000]

        $c[A black dragon gets the opponent's apex. The opponent must be an apex: dev arena allows opponents of any tier]
        $if[$and[$getField[this;tier]==17;$includes[$toLowerCase[$jsonGet[this;animal_id]];king_dragon]==false;$arrayIncludes[$getGlobalVar[allApex];$env[opponentApex]]];
          $setField[this;apex;$arrayUnion[$getField[this;apex];$arrayOf[$env[opponentApex]]]]
        ]
        $callMethod[this;resetArena]
      `,
        },
        loseArena: `
      $c[The XP is lost before the animal is: a king dragon's loss depends on it]
      $callMethod[this;die]
      $setField[this;animal_id;null]
      $setField[this;animal_skin_id;null]
      $callMethod[this;resetArena]
      $callMethod[this;removeAllApex]
    `,
        evolveInto: {
            params: [
                { name: "animalId", type: forge_class_1.ParamType.String },
                { name: "cash", type: forge_class_1.ParamType.Number },
                { name: "skinId", type: forge_class_1.ParamType.String },
            ],
            code: `
        $callMethod[this;removeAllApex]
        $callMethod[this;addCash;$env[cash]]

        $c[A held soccer stays with a living animal that keeps its biome]
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
        dropSoccer: `$setField[this;held_soccer;null]`,
        soccerXp: {
            params: [
                { name: "soccerType", type: forge_class_1.ParamType.String },
                { name: "soccerId", type: forge_class_1.ParamType.Number },
            ],
            code: `
        $c[A hold gives a percent of the XP the next tier starts at, kept between a minimum and a limit, all bigger for a rarer soccer. A goal gives a multiple of it]
        $let[multiplier;$jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];xpMultiplier]]
        $let[tierMaxXp;$jsonGet[$getGlobalVar[xpPerTier];$getField[this;tier];1]]
        $let[xp;$max[$min[$math[$get[tierMaxXp] * $getGlobalVar[soccerHoldXpPercent] / 100];$getGlobalVar[soccerHoldMaxXp]];$getGlobalVar[soccerHoldMinXp]]]
        $return[$round[$math[$get[xp] * $get[multiplier]]]]
      `,
        },
        holdSoccer: {
            params: [
                { name: "soccerType", type: forge_class_1.ParamType.String },
                { name: "soccerId", type: forge_class_1.ParamType.Number },
                { name: "canLose", type: forge_class_1.ParamType.Boolean, required: false },
            ],
            code: `
        $let[MC;$getSoccerMC[this;$env[soccerType];$env[soccerId];hold]]
        $let[XP;$callMethod[this;soccerXp;$env[soccerType];$env[soccerId]]]
        $if[$nullish[$env[canLose];true];
          $jsonLoad[lossChances;$getGlobalVar[soccerLossChances]]
          $let[stealChance;$getSoccerStealChance[this;$env[soccerType];$env[soccerId]]]
          $let[lossRoll;$random[1;1000]]
          $c[Dev override: forces this hold's outcome, used once]
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
});
//# sourceMappingURL=PlaySession.js.map