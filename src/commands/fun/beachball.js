import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "beachball",
  type: "messageCreate",
  aliases: ["bb"],
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '20s'})}
    
    $let[cmd;$commandName]
    $jsonLoad[$get[cmd]s;$readFile[src/json/$get[cmd]s.json]]
    $jsonLoad[l;$readFile[src/json/localizations.json]]
    $let[lang;$env[userProfile;language]]
    $jsonLoad[catchContent;$env[l;$get[cmd];0;$get[lang]]]
    $jsonLoad[holdContent;$env[l;$get[cmd];1;$get[lang]]]
    
    $let[length;$arraylength[$get[cmd]s]]
    $let[lastI;$math[$get[length] - 1]]
    $let[arg;$message]

    $if[$and[$env[userProfile;devMode];$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[lastI]];
      $let[targetID;$get[arg]]
    ;
      $let[targetID;-1]
    ]

    $loop[$get[length];
      $jsonLoad[$get[cmd];$env[$get[cmd]s;$math[$env[i]-1]]]
      $let[rarity;$env[$get[cmd];rarity]]
      $let[cond1;$and[$get[targetID]!=-1;$env[$get[cmd];ID]==$get[targetID]]]
      $let[cond2;$and[$get[targetID]==-1;$randomNumber[1;$math[$get[rarity] + 1]]==1]]

      $if[$or[$get[cond1];$get[cond2]];
        $let[thum;$env[$get[cmd];thum]]
        $let[MC;$randomNumber[$env[$get[cmd];MC;0];$env[$get[cmd];MC;1]]]
        $let[emoji;$env[$get[cmd];emoji]]
        $let[color;$env[$get[cmd];color]]
        $break
      ]
    ;i;true]

    $callFunction[sumMC;$get[MC]]
    $setUserVar[userProfile;$env[userProfile]]

    $addContainer[
      $callFunction[newAuthor]
      $addSeparator[Large]
      $addSection[
        $addTextDisplay[## $replace[$arrayRandomValue[catchContent];{0};$get[emoji]]!]
        $addTextDisplay[## $arrayRandomValue[holdContent] $separateNumber[$get[MC];,]$getGlobalVar[emoji]!]
        $addThumbnail[$get[thum]]
      ]
      $if[$get[rarity]!=1;
        $addTextDisplay[-# Rarity: 1/$get[rarity]]
      ]
    ;$get[color]]
  `
}