export default {
  type: 'interactionCreate',
  code: `
    $arrayLoad[IID;-;$customID]
    
    $onlyIf[$arrayIncludes[IID;play_soccer_actions]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]

    $let[biome;$env[playData;currentBiome]]
    $let[color;$env[biomeColors;$get[biome]]]

    $jsonLoad[pumpkins;$readFile[src/json/pumpkins.json]]
    $jsonLoad[beachballs;$readFile[src/json/beachballs.json]]
    $jsonLoad[umbrellas;$readFile[src/json/umbrellas.json]]
    
    $arrayLoad[data;_;$env[IID;0]]
    $let[soccerType;$env[data;0]]
    $let[id;$env[data;1]]

    $switch[$get[soccerType];
      $case[pumpkin;
        $jsonLoad[soccerData;$arrayFind[pumpkins;p;$return[$checkCondition[$get[id]==$env[p;ID]]]]]
      ]
      $case[beachball;]
      $case[umbrella;]
    ]

    $onlyIf[$env[soccerData]!=;
      $logger[Error;Soccer item not found: Type - $get[soccerType], ID - $get[id]]
    ]

    $jsonLoad[reward;$env[soccerData;MC]]
    $let[emoji;$env[soccerData;emoji]]
    $let[name;$tl[data.$get[soccerType]s.$env[soccerData;ID]]]
    $let[MC;$round[$math[$random[$env[reward;0];$env[reward;1]] / 20]]]

    $let[value;$selectMenuValues]
    $let[goalFailR;$random[1;100]]
    $let[goalFailC;30]


    $switch[$get[value];
      $case[0; $c[Hold]

      ]

      $case[1; $c[Ignore]
        $addContainer[
          $addAuthorDisplay
          
          $addTextDisplay[$tl[ui.play.soccer.ignored;$get[name] $get[emoji]]]

          $addSeparator[Large]

          $displayAnimalStats
          $addActionsMenu

          $addExitButton
          $addCheats
        ;$get[color]]
      ]

      $case[2; $c[Goal]
        $if[$get[goalFailR]<=$get[goalFailC];
          $let[MC;$round[$math[$random[$env[reward;0];$env[reward;1]] / 50]]]
          $addContainer[
            $addAuthorDisplay
            
            $addTextDisplay[$tl[ui.play.soccer.goalFailed;$get[name] $get[emoji];$get[MC]]]

            $addSeparator[Large]

            $displayAnimalStats
            $addSoccerActionsMenu[true]

            $addExitButton
            $addCheats
          ;$get[color]]
        ;
          $sumPlayCash[$get[MC]]
          $addContainer[
            $addAuthorDisplay
            
            $addTextDisplay[$tl[ui.play.soccer.goaled;$get[name] $get[emoji];$get[MC]]]

            $addSeparator[Large]

            $displayAnimalStats
            $addActionsMenu

            $addExitButton
            $addCheats
          ;$get[color]]
          $updatePlayData
        ]
      ]
      
      $case[3; $c[Throw away]
        $addContainer[
          $addAuthorDisplay
          
          $addTextDisplay[$tl[ui.play.soccer.threw;$get[name] $get[emoji]]]

          $addSeparator[Large]

          $displayAnimalStats
          $addActionsMenu

          $addExitButton
          $addCheats
        ;$get[color]]
      ]
    ]
    $interactionUpdate
  `
}