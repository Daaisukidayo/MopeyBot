import listGenerator from '../../JSfunctions/luck challenge/listGenerator.js'
import JSON from '../../JSfunctions/luck challenge/jsonForChallengeAndHistory.js'

export default {
  name: 'count',
  type: 'messageCreate',
  code: `
    $reply
    $let[cdTime;5s]
    ${JSON()}
    $callFunction[checking]
    $callFunction[cooldown;$get[cdTime]]
    
    $onlyIf[$message!=;
      $callFunction[newError;Usage: \`$getGuildVar[prefix]count <animalShortName> ...\`]
    ]

    $let[totalRares;0]
    $let[totalPoints;0]

    $arrayLoad[caughtRares; ;$toLowerCase[$message]]
    $jsonLoad[raresList;{}]
    $arrayLoad[unknownContent]

    $loop[$arrayLength[caughtRares];
      $let[i;$math[$env[i] - 1]]
      $let[caughtRare;$arrayAt[caughtRares;$get[i]]]

      $if[$arrayIncludes[allRares;$get[caughtRare]];;
        $arrayPush[unknownContent;$get[caughtRare]]
        $continue
      ]

      $let[animalID;$callFunction[findingAnimalID;$get[caughtRare]]]
      $let[newQuantity;$math[$env[raresList;$get[animalID]] + 1]]
      $!jsonSet[raresList;$get[animalID];$get[newQuantity]]
    ;i;true]

    ${listGenerator('listContent', true)}

    $c[===========EMBED===========]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 1 Hour Luck Points Count]
      $addSeparator[Large]
      $addTextDisplay[## ⁘ Total points: \`$get[totalPoints]\`]
      $addTextDisplay[## ⁘ Total rares: \`$get[totalRares]\`]
      $addSeparator
      $callFunction[listDesign;listContent]
      $addSeparator[Large]
      $if[$arrayLength[unknownContent]!=0;
        $addTextDisplay[# Unknown rares]
        $addSeparator
        $callFunction[listDesign;unknownContent]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}