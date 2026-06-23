// TODO

export default {
  name: "play_soccerActions",
  type: "interactionCreate",
  allowed: ['stringSelect'],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]

    $let[biome;$env[playData;currentBiome]]
    $let[color;$env[biomeColors;$get[biome]]]

    $jsonLoad[pumpkins;$readFile[res/data/pumpkins.json]]
    $jsonLoad[beachballs;$readFile[res/data/beachballs.json]]
    $jsonLoad[umbrellas;$readFile[res/data/umbrellas.json]]
    
    $arrayLoad[data;___;$env[IID;1]]
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
    $let[name;$tl[data.$get[soccerType]s.$env[soccerData;ID].$get[l]]]
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
          
          $addTextDisplay[$tl[ui.play.soccer.ignored.$get[l];$get[name] $get[emoji]]]

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
            
            $addTextDisplay[$tl[ui.play.soccer.goalFailed.$get[l];$get[name] $get[emoji];$get[MC]]]

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
            
            $addTextDisplay[$tl[ui.play.soccer.goaled.$get[l];$get[name] $get[emoji];$get[MC]]]

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
          
          $addTextDisplay[$tl[ui.play.soccer.threw.$get[l];$get[name] $get[emoji]]]

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