import challengeSnippets from '#snippets/challengeSnippets.js'

export default {
  name: "editlist",
  aliases: ["elist", "el"],
  type: "messageCreate",
  code: `
    $reply
    ${challengeSnippets.isActiveChallenge()}
    ${challengeSnippets.loadGJSON()}
    $jsonLoad[raresList;$env[challengeProgress;list]]
    
    $let[arg1;$toLowerCase[$message[0]]]
    $let[arg2;$message[1]]
    $let[arg3;$toLowerCase[$message[2]]]
    $let[usage;## Usage: \`$getGuildVar[prefix]editlist <rare> [+ || -\\] <amount>\`]
    
    $onlyIf[$get[arg1]!=;
      $callFunction[embed;error] 
      $description[$get[usage]]
    ]

    $onlyIf[$arrayIncludes[allRares;$get[arg1]];
      $callFunction[embed;error] 
      $description[## The rare «\`$get[arg1]\`» does not exist!]
    ]

    $onlyIf[$includes[$get[arg2];+;-];
      $callFunction[embed;error] 
      $description[$get[usage]]
    ]

    $onlyIf[$or[$and[$get[arg3]==all;$get[arg2]==-];$and[$isNumber[$get[arg3]];$get[arg3]>0]];
      $callFunction[embed;error] 
      $description[## Only a number greater than 0 or argument «\`all\`» (if removing) is allowed!]
    ]
    
    $let[caughtRare;$get[arg1]]
    $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
    $let[animal;$env[animals;$env[animalsIndexes;$get[animalID]];variants;0;emoji]]
    $let[count;$get[arg3]]
    $let[quantity;$default[$env[raresList;$get[animalID]];0]]
    $let[rares;0]
    $let[points;0]

    $if[$get[arg2]==-;
      $let[state;Removed]
    ;
      $let[state;Added]
    ]

    $if[$and[$jsonHas[raresList;$get[animalID]]==false;$get[arg2]==-];
      $callFunction[embed;error] 
      $description[## Animal «$get[animal]» is not in the list!]
      $sendMessage[$channelID]
      $stop
    ]
    
    $if[$get[arg3]==all;
      $let[count;$get[quantity]]
      $!jsonDelete[raresList;$get[animalID]]
    ;
      $let[quantity;$math[$get[quantity] $get[arg2] $get[count]]]
      $!jsonSet[raresList;$get[animalID];$get[quantity]]

      $if[$get[quantity]<=0;
        $!jsonDelete[raresList;$get[animalID]]
      ]
    ]
    
    $jsonLoad[raresListEntries;$jsonEntries[raresList]]
    
    $if[$arrayAt[raresListEntries;0]==;;
      $arrayForEach[raresListEntries;entry;
        $let[animalID;$env[entry;0]]
        $let[quantity;$env[entry;1]]
        $jsonLoad[output;$callFunction[findingRareInChallengeDataBase;$get[animalID]]]
        $let[challengeDataPoints;$env[output;points]]
        
        $letSum[rares;$get[quantity]]
        $letSum[points;$math[$get[quantity] * $get[challengeDataPoints]]]
      ]
    ]

    $!jsonSet[challengeProgress;list;$env[raresList]]
    $!jsonSet[challengeProgress;rares;$get[rares]]
    $!jsonSet[challengeProgress;points;$get[points]]
    $setUserVar[challengeProgress|$channelID;$env[challengeProgress]]
    ${challengeSnippets.listGenerator()}

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## ✅ $get[state] \`$get[count]\` $get[animal]]
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showPoints;$authorID]]
      $addTextDisplay[## $callFunction[showRares;$authorID]]
      $addSeparator[Large]
      ${challengeSnippets.listDesign()}
      $addSeparator[Large]
      $addTextDisplay[## $callFunction[showTime;$authorID]]
    ;$getGlobalVar[luckyColor]]
  `
}