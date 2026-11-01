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

    $jsonLoad[playData;$getPlayData]
    $isPlaying[playData]

    $arrayLoad[data;___;$jsonGet[IID;1]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[color;$getBiomeColor[playData]]
    $let[soccerType;$jsonGet[data;0]]
    $let[id;$jsonGet[data;1]]

    $c[soccer got removed from the game? drop it]
    $if[$getPlaySoccer[$get[soccerType];$get[id]]==;
      $logger[Error;Soccer item not found: Type - $get[soccerType], ID - $get[id]]
      $callMethod[playData;dropSoccer]
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

    $c[hold-ish actions fill 'holdResult' (see holdSoccer), the rest drop the soccer and set 'desc']
    $switch[$get[value];
      $case[soccer_action_hold;
        $jsonLoad[holdResult;$callMethod[playData;holdSoccer;$get[soccerType];$get[id]]]
        $let[resultTextKey;held]
      ]

      $case[soccer_action_ignore;
        $callMethod[playData;dropSoccer]
        $let[desc;$tl[ui.play.soccer.ignored.$get[l];$get[soccer]]]
      ]

      $case[soccer_action_goal;
        $let[goalFailR;$random[1;100]]
        $let[goalFailC;$getGlobalVar[soccerGoalFailChance]]
        $let[lossRoll;$random[1;1000]]
        $let[goalStealChance;$round[$math[$getSoccerStealChance[playData;$get[soccerType];$get[id]] * $jsonGet[$getGlobalVar[soccerLossChances];stealGoalMultiplier]]]]

        $c[dev override for the goal outcome, one-shot]
        $switch[$jsonGet[playData;dev;forcedSoccer];
          $case[stolen;$let[lossRoll;0]]
          $case[failed;$let[lossRoll;1001] $let[goalFailR;0]]
          $case[success;$let[lossRoll;1001] $let[goalFailR;101]]
        ]
        $!jsonSet[playData;dev;forcedSoccer;null]

        $if[$get[lossRoll]<=$get[goalStealChance];
          $callMethod[playData;dropSoccer]
          $jsonLoad[holdResult;$objectOf[outcome;stolenOnGoal]]
        ;$if[$get[goalFailR]<=$get[goalFailC];
          $c[failed goal = a hold, the steal was already rolled for the goal]
          $jsonLoad[holdResult;$callMethod[playData;holdSoccer;$get[soccerType];$get[id];false]]
          $let[resultTextKey;goalFailed]
        ;
          $c[a goal pays a multiple of a hold]
          $let[goalXP;$math[$callMethod[playData;soccerXp;$get[soccerType];$get[id]] * $getGlobalVar[soccerGoalXpMultiplier]]]
          $let[MC;$getSoccerMC[playData;$get[soccerType];$get[id];goal]]

          $callMethod[playData;addCash;$get[MC]]
          $callMethod[playData;addXp;$get[goalXP]]
          $callMethod[playData;dropSoccer]
          $let[desc;$tl[ui.play.soccer.goaled.$get[l];$get[soccer];$separate[$get[MC]];$separate[$get[goalXP]]]]
        ]]
      ]

      $case[soccer_action_throwaway;
        $callMethod[playData;dropSoccer]
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
  `,
})
