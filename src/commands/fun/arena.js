import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "arena",
  aliases: ["pvp"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '30s'})}

    $let[r;$randomNumber[0;101]]
    $let[MC;$randomNumber[1500;2001]]

    $jsonLoad[animals;$readFile[src/json/animals.json]]
    $jsonLoad[LOC;$readFile[src/json/localizations.json]]
    $jsonLoad[enemies;$getGlobalVar[arenaEnemies]]
    $let[lang;$env[userProfile;language]]
    $let[winContent;$env[LOC;arena;0;$get[lang]]]
    $let[loseContent;$env[LOC;arena;1;$get[lang]]]


    $if[$get[r]>=20;
      $callFunction[sumMC;$get[MC]]
      $let[desc;$advancedReplace[$get[winContent];{0};$arrayRandomValue[enemies];{1};$get[MC];{2};$getGlobalVar[emoji]]]
      $let[color;$getGlobalVar[defaultColor]]
    ;
      $let[desc;$advancedReplace[$get[loseContent];{0};$arrayRandomValue[enemies]]]
      $let[color;$getGlobalVar[errorColor]]
    ]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addTextDisplay[## $get[desc]]
    ;$get[color]]
    $setUserVar[userProfile;$env[userProfile]]
  `
}
