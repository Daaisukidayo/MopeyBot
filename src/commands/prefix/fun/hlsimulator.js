export default {
  name: 'hlsimulator',
  aliases: ['hlsim'],
  type: 'messageCreate',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]

    $let[arg;$default[$toTitleCase[$message];1]]

    $if[$isNumber[$get[arg]]==false;
      $jsonLoad[diff;$tl[data.difficulties]]
      $arrayLoad[diffV;, ;$jsonValues[diff]]
      $let[arg;$arrayIndexOf[diffV;$toTitleCase[$get[arg]]]]
    ]

    $onlyif[$arrayIncludes[difficulties;$get[arg]];
      $newError[$tl[ui.hlsimulator.invalidDifficulty]]
    ]

    $addCooldown[15s]

    $jsonLoad[cache;$getGlobalVar[hlSimCachedData;{}]]
    $jsonLoad[totalAttempts;$eval[$getGlobalVar[hlSimAttempts];false]]
    $jsonLoad[GLE;$advJsonEntries[$generateLuck[$getGlobalVar[hlSimKey]]]]
    $jsonLoad[rawList;{}]

    $arrayForEach[GLE;entry;
      $jsonLoad[raresArr;$env[entry;1]]
      $jsonLoad[counts;{}]

      $let[attemptsIndex;$arrayFindIndex[totalAttempts;att;$advArrayIncludes[$env[att;0];$env[entry;0]]]]
      $let[attempts;$env[totalAttempts;$get[attemptsIndex];1]]

      $loop[$get[attempts];
        $let[animalID;$arrayRandomValue[raresArr]]

        $if[$env[cache;$get[animalID]];;$continue]

        $let[count;$default[$env[counts;$get[animalID]];0]]
        $jsonSet[counts;$get[animalID];$math[$get[count] + 1]]
      ]
      $jsonAssign[rawList;rawList;$env[counts]]
    ]

    $jsonLoad[result;$generateList[$sortList[$env[rawList]];$get[arg]]]
    
    $jsonLoad[list;$env[result;l]]
    $let[totalPoints;$env[result;p]]
    $let[totalRares;$env[result;r]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.challenge.points;$get[totalPoints]]]
      $addTextDisplay[$tl[ui.challenge.rares;$get[totalRares]]]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
  `
}