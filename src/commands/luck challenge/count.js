import challengeSnippets from '../../snippets/challengeSnippets.js'
import universalSnippets from '../../snippets/universalSnippets.js'

export default {
  name: 'count',
  type: 'messageCreate',
  code: `
    $reply
    ${challengeSnippets.loadGJSON()}
    ${universalSnippets.checkProfile({time: "5s"})}
    
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

    ${challengeSnippets.listGenerator({arrayName: 'listContent', addPoints: true})}

    $c[===========EMBED===========]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[# 1 Hour Luck Points Count]
      $addSeparator[Large]
      $addTextDisplay[## ⁘ Total points: \`$get[totalPoints]\`]
      $addTextDisplay[## ⁘ Total rares: \`$get[totalRares]\`]
      $addSeparator
      ${challengeSnippets.listDesign('listContent')}
      $addSeparator[Large]
      $if[$arrayLength[unknownContent]!=0;
        $addTextDisplay[# Unknown rares]
        $addSeparator
        ${challengeSnippets.listDesign('unknownContent')}
      ]
    ;$getGlobalVar[luckyColor]]
  `
}