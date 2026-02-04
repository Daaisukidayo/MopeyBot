export default {
  name: "umbrella",
  type: "messageCreate",
  aliases: ["ur"],
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[20s]
    
    $let[cmd;$commandName]
    $jsonLoad[$get[cmd]s;$readFile[src/json/$get[cmd]s.json]]
    
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
      $let[cond2;$and[$get[targetID]==-1;$random[1;$get[rarity]]==1]]

      $if[$or[$get[cond1];$get[cond2]];;$continue]

      $let[thum;$env[$get[cmd];thum]]
      $let[MC;$random[$env[$get[cmd];MC;0];$env[$get[cmd];MC;1]]]
      $let[display;$tl[data.$get[cmd]s.$env[$get[cmd];ID]]]
      $let[color;$env[$get[cmd];color]]
      $break
    ;i;true]

    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.$get[cmd].saw;$get[display]]]
        $addTextDisplay[$tl[ui.$get[cmd].earned;$separate[$get[MC]]]]
        $addThumbnail[$get[thum]]
      ]
      $if[$get[rarity]!=1;
        $addSeparator
        $addTextDisplay[$tl[ui.$get[cmd].rarity;1;$get[rarity]]]
      ]
    ;$get[color]]
  `
}