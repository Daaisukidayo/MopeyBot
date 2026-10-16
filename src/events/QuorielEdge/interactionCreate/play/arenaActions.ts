import { Command } from "@quoriel/edge"

export default new Command({
  name: "play_arenaAction",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[playerAction;$jsonGet[IID;1]]
    $let[turn;$jsonGet[playData;arena;turn]]
    $let[opponentAction;$jsonGet[playData;arena;opponentAction]]
    $let[bites;$jsonGet[playData;arena;bites]]
    $let[opponentBites;$jsonGet[playData;arena;opponentBites]]
    $c[A rare apex counts as its common one]
    $let[opponentApex;$jsonGet[playData;arena;opponentAnimal]]
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
    $objectMerge[playData;arena;$objectOf[bites;$get[bites];opponentBites;$get[opponentBites];opponentAction;$default[$get[nextOpponentAction];$get[opponentAction]]]]

    $addContainer[
      $addAuthorDisplay

      $addArenaStatus[playData;userWardrobe]
      $addSeparator
      $addTextDisplay[$tl[ui.play.arena.table.userChose.$get[l];$tl[data.arenaActions.$get[playerAction].$get[l]]]]
      $addTextDisplay[$tl[ui.play.arena.table.opponentChose.$get[l];$tl[data.arenaActions.$get[opponentAction].$get[l]]]]
      $addSeparator
      $addTextDisplay[$tl[ui.play.arena.actions.$jsonGet[rule;1].$get[l]]]
      $addSeparator

      $c[Ten bites win or lose the fight, otherwise the turn passes]
      $if[$get[bites]>=10;
        $addTextDisplay[$tl[ui.play.arena.table.won.$get[l]]]
        $addSeparator[Large]

        $jsonMath[playData;XP;$jsonGet[playData;arena;opponentXP]]
        $jsonMath[playData;MC;1000]

        $c[A black dragon gets the opponent's apex. The opponent must be an apex: dev arena allows opponents of any tier]
        $if[$and[$jsonGet[playData;tier]==17;$includes[$toLowerCase[$jsonGet[playData;currentAnimal]];kingdragon]==false;$arrayIncludes[$getGlobalVar[allApex];$get[opponentApex]]];
          $!jsonSet[playData;apex;$arrayUnion[$jsonGet[playData;apex];$arrayOf[$get[opponentApex]]]]
        ]

        $resetArenaData[playData]
        $displayAnimalStats[playData;userWardrobe]
        $addActionsMenu[playData]
        $addSeparator
        $addExitButton[playData]
        $addCheats[playData]
        $let[color;$getGlobalVar[luckyColor]]
      ;$if[$get[opponentBites]>=10;
        $addTextDisplay[$tl[ui.play.arena.table.lost.$get[l]]]
        $addSeparator[Large]

        $!jsonSet[playData;isDead;true]
        $c[Must run before clearing currentAnimal: King Dragon's XP reset depends on it]
        $updateXpOnDeath[playData]
        $!jsonSet[playData;currentAnimal;null]
        $resetArenaData[playData]
        $setNewTier[playData]
        $removeAllApex[playData]

        $addActionsMenu[playData]
        $addSeparator
        $addExitButton[playData]
        $let[color;$getGlobalVar[errorColor]]
      ;
        $let[turn;$math[1 - $get[turn]]]
        $!jsonSet[playData;arena;turn;$get[turn]]
        $if[$get[turn]==1;
          $addTextDisplay[$tl[ui.play.arena.table.opponentTurn.$get[l]]]
          $addTextDisplay[$tl[ui.play.arena.table.opponentChose.$get[l];$tl[data.arenaActions.$jsonGet[playData;arena;opponentAction].$get[l]]]]
        ;
          $addTextDisplay[$tl[ui.play.arena.table.userTurn.$get[l]]]
          $addTextDisplay[$tl[ui.play.arena.table.userChoose.$get[l]]]
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
})
