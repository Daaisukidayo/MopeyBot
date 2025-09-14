import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "tornado",
  aliases: ["td"],
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({time: '20s'})}

    $jsonLoad[allTornadoes;$readFile[src/json/tornadoes.json]]
    $jsonLoad[l;$readFile[src/json/localizations.json]]
    $jsonLoad[content;$env[l;tornado;0;$env[userProfile;language]]]
    $let[content;$arrayRandomValue[content]]

    $let[r;$randomNumber[1;31]]
    
    $if[1==$get[r];
      $let[type;devil]
      $let[MC;$randomNumber[2500;4001]]
    ;
      $let[type;normal]
      $let[MC;$randomNumber[300;601]]
    ]

    $jsonLoad[tornadoes;$env[allTornadoes;$get[type]]]
    $jsonLoad[tornado;$arrayRandomValue[tornadoes]]

    $let[clr;$env[tornado;color]]
    $let[td;__$env[tornado;name]__]
    $let[thum;$env[tornado;thumbnail]]

    $callFunction[sumMC;$get[MC]]
    $setUserVar[userProfile;$env[userProfile]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addSection[
        $addTextDisplay[## $advancedReplace[$get[content];{0};$get[td];{1};$separateNumber[$get[MC];.];{2};$getGlobalVar[emoji]]]
        $addThumbnail[$get[thum]]
      ]
    ;$get[clr]]
  `
}