import { Command } from "@quoriel/edge"

export default new Command({
  name: "play_soccerActions",
  type: "interactionCreate",
  allowed: ["stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]

    $arrayLoad[data;___;$jsonGet[IID;1]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[color;$getBiomeColor[playData]]
    $let[soccerType;$jsonGet[data;0]]
    $let[id;$jsonGet[data;1]]

    $c[A soccer removed from the game is dropped]
    $if[$getPlaySoccer[$get[soccerType];$get[id]]==;
      $logger[Error;Soccer item not found: Type - $get[soccerType], ID - $get[id]]
      $!jsonDelete[playData;heldSoccer]
      $addContainer[
        $addAuthorDisplay
        $displayAnimalStats[playData;userWardrobe]
        $addActionsMenu[playData]
        $addExitButton[playData]
        $addCheats[playData]
      ;$get[color]]
      $updatePlayData[playData]
      $interactionUpdate
      $stop
    ]

    $let[soccer;$getSoccerDisplay[$get[soccerType];$get[id]]]

    $let[value;$selectMenuValues]

    $c[Hold-like actions put their result in 'holdResult' (see holdSoccer), the others drop the soccer and set 'desc']
    $switch[$get[value];
      $case[0; $c[Hold]
        $jsonLoad[holdResult;$holdSoccer[playData;$get[soccerType];$get[id]]]
        $let[resultTextKey;held]
      ]

      $case[1; $c[Ignore]
        $!jsonDelete[playData;heldSoccer]
        $let[desc;$tl[ui.play.soccer.ignored.$get[l];$get[soccer]]]
      ]

      $case[2; $c[Goal]
        $let[goalFailR;$random[1;100]]
        $let[goalFailC;$getGlobalVar[soccerGoalFailChance]]
        $let[lossRoll;$random[1;1000]]
        $let[goalStealChance;$round[$math[$getSoccerStealChance[playData;$get[soccerType];$get[id]] * $jsonGet[$getGlobalVar[soccerLossChances];stealGoalMultiplier]]]]

        $c[Dev override: forces this goal's outcome, used once]
        $switch[$jsonGet[playData;devForcedSoccer];
          $case[stolen;$let[lossRoll;0]]
          $case[failed;$let[lossRoll;1001] $let[goalFailR;0]]
          $case[success;$let[lossRoll;1001] $let[goalFailR;101]]
        ]
        $!jsonDelete[playData;devForcedSoccer]

        $if[$get[lossRoll]<=$get[goalStealChance];
          $!jsonDelete[playData;heldSoccer]
          $jsonLoad[holdResult;$objectOf[outcome;stolenOnGoal]]
        ;$if[$get[goalFailR]<=$get[goalFailC];
          $c[A failed goal counts as holding the soccer. The steal was already rolled for the goal]
          $jsonLoad[holdResult;$holdSoccer[playData;$get[soccerType];$get[id];false]]
          $let[resultTextKey;goalFailed]
        ;
          $c[A goal gives a share of the tier's max XP, bigger for a rarer soccer]
          $let[goalXP;$round[$math[$jsonGet[xpPerTier;$jsonGet[playData;tier];1] * $getGlobalVar[soccerGoalXpPercent] / 100 * $jsonGet[$getPlaySoccer[$get[soccerType];$get[id]];xpMultiplier]]]]
          $let[MC;$getSoccerMC[playData;$get[soccerType];$get[id];goal]]

          $sumPlayCash[playData;$get[MC]]
          $sumPlayXp[playData;$get[goalXP]]
          $!jsonDelete[playData;heldSoccer]
          $let[desc;$tl[ui.play.soccer.goaled.$get[l];$get[soccer];$separate[$get[MC]];$separate[$get[goalXP]]]]
        ]]
      ]

      $case[3; $c[Throw away]
        $!jsonDelete[playData;heldSoccer]
        $let[desc;$tl[ui.play.soccer.threw.$get[l];$get[soccer]]]
      ]
    ]

    $if[$and[$env[holdResult]!=;$jsonGet[holdResult;outcome]!=held];
      $let[color;$getGlobalVar[errorColor]]
    ]

    $addContainer[
      $addAuthorDisplay

      $if[$env[holdResult]!=;
        $addSoccerHoldResult[playData;userWardrobe;$get[soccerType];$get[id];$default[$get[resultTextKey];held];$env[holdResult]]
      ;
        $addSoccerSection[$get[soccerType];$get[id];$get[desc]]
        $addSeparator[Large]
        $displayAnimalStats[playData;userWardrobe]
        $addActionsMenu[playData]
      ]

      $addExitButton[playData]
      $addCheats[playData]
    ;$get[color]]

    $updatePlayData[playData]
    $interactionUpdate
  `
})
