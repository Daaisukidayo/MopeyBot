"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_arenaAction",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getPlayData]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $c[A button of a fight that already ended shows the game again]
    $if[$jsonGet[playData;arena;opponent;animal_id]==;
      $addContainer[
        $addAuthorDisplay
        $if[$jsonGet[playData;animal_id]!=;$displayAnimalStats[playData;userWardrobe]]
        $addActionsMenu[playData]
        $addSeparator
        $addExitButton[playData]
        $addCheats[playData]
      ;$getBiomeColor[playData]]
      $interactionUpdate
      $stop
    ]

    $let[playerAction;$jsonGet[IID;1]]
    $let[turn;$jsonGet[playData;arena;turn]]
    $let[opponentAction;$jsonGet[playData;arena;opponent;action]]
    $let[bites;$jsonGet[playData;arena;player;bites]]
    $let[opponentBites;$jsonGet[playData;arena;opponent;bites]]
    $c[A rare apex counts as its common one]
    $let[opponentApex;$jsonGet[playData;arena;opponent;animal_id]]
    $if[$get[opponentApex]==aqua;$let[opponentApex;yeti]]
    $if[$isOneOf[$get[opponentApex];king_dragon;rare_king_dragon];$let[opponentApex;black_dragon]]

    $c[On the player's turn the opponent reacts: 65% the counter, 25% the same action, 10% the one it beats. It also picks its next action]
    $if[$get[turn]==0;
      $let[reaction;$random[0;100]]
      $let[opponentAction;$math[($get[playerAction] + $if[$get[reaction]<=65;1;$if[$get[reaction]<=90;0;2]]) % 3]]
      $let[nextOpponentAction;$jsonGet[$arraySample[$getGlobalVar[arenaActions]];id]]
    ]

    $c[A rule is [chance, description, who gets a bite\\]: the last one has chance 0, so one always matches]
    $let[actionR;$random[0;100]]
    $jsonLoad[rule;$arrayFind[$jsonGet[$getGlobalVar[arenaMatrix];$get[playerAction]_$get[opponentAction]];r;$get[actionR]>=$jsonGet[r;0]]]
    $switch[$jsonGet[rule;2];
      $case[1;$letSum[bites;1]]
      $case[2;$letSum[opponentBites;1]]
    ]
    $!jsonSet[playData;arena;player;bites;$get[bites]]
    $objectMerge[playData;arena;opponent;$objectOf[bites;$get[opponentBites];action;$default[$get[nextOpponentAction];$get[opponentAction]]]]

    $addContainer[
      $addAuthorDisplay

      $addArenaStatus[playData;userWardrobe]
      $addSeparator
      $c[Lines that follow each other are one text: a message holds 40 components at most]
      $addTextDisplay[$tl[ui.play.arena.table.userChose.$get[l];$tl[data.arenaActions.$get[playerAction].$get[l]]]\n$tl[ui.play.arena.table.opponentChose.$get[l];$tl[data.arenaActions.$get[opponentAction].$get[l]]]]
      $addSeparator
      $addTextDisplay[$tl[ui.play.arena.actions.$jsonGet[rule;1].$get[l]]]
      $addSeparator

      $c[Ten bites win or lose the fight, otherwise the turn passes]
      $if[$get[bites]>=10;
        $addTextDisplay[$tl[ui.play.arena.table.won.$get[l]]]
        $addSeparator[Large]

        $callMethod[playData;winArena;$get[opponentApex]]
        $displayAnimalStats[playData;userWardrobe]
        $addActionsMenu[playData]
        $addSeparator
        $addExitButton[playData]
        $addCheats[playData]
        $let[color;$getGlobalVar[luckyColor]]
      ;$if[$get[opponentBites]>=10;
        $addTextDisplay[$tl[ui.play.arena.table.lost.$get[l]]]
        $addSeparator[Large]

        $callMethod[playData;loseArena]

        $addActionsMenu[playData]
        $addSeparator
        $addExitButton[playData]
        $let[color;$getGlobalVar[errorColor]]
      ;
        $let[turn;$math[1 - $get[turn]]]
        $!jsonSet[playData;arena;turn;$get[turn]]
        $if[$get[turn]==1;
          $addTextDisplay[$tl[ui.play.arena.table.opponentTurn.$get[l]]\n$tl[ui.play.arena.table.opponentChose.$get[l];$tl[data.arenaActions.$jsonGet[playData;arena;opponent;action].$get[l]]]]
        ;
          $addTextDisplay[$tl[ui.play.arena.table.userTurn.$get[l]]\n$tl[ui.play.arena.table.userChoose.$get[l]]]
        ]

        $addArenaActionButtons
        $addArenaDevMenu[playData]
        $addSeparator
        $addExitButton[playData]
        $addCheats[playData]
        $let[color;$getGlobalVar[defaultColor]]
      ]]
    ;$get[color]]
    $updatePlayData[playData]
    $interactionUpdate
  `,
});
//# sourceMappingURL=arenaActions.js.map