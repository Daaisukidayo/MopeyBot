import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'soccerEmbed',
  code: `
    $defer

    $let[cmd;$commandName]

    $jsonLoad[soccerData;$readFile[res/data/$get[cmd]s.json]]
    
    $let[length;$arraylength[soccerData]]
    $let[lastI;$math[$get[length] - 1]]
    $let[arg;$message]

    $let[target;$function[
      $if[$and[$env[userProfile;devMode]==1;$get[arg]!=;$isNumber[$get[arg]];$get[arg]>-1;$get[arg]<=$get[lastI]];
        $return[$get[arg]]
      ]
      $return[-1]
    ]]

    $forOf[soccerData;data;
      $let[rarity;$env[data;rarity]]
      $let[cond1;$and[$get[target]!=-1;$env[data;ID]==$get[target]]]
      $let[cond2;$and[$get[target]==-1;$randomNumber[1;$math[$get[rarity] + 1]]==1]]

      $if[$or[$get[cond1];$get[cond2]];;$continue]

      $attachment[res/img/custom/soccer/$get[cmd]s/$env[data;ID].png;thumbnail.png]
      $let[MC;$random[$env[data;MC;0];$env[data;MC;1]]]
      $let[display;$tl[data.$get[cmd]s.$env[data;ID].$get[l]]]
      $let[color;$env[data;color]]
      $break
    ]

    $sumCash[$get[MC]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.$get[cmd].saw.$get[l];$get[display]]]
        $addTextDisplay[$tl[ui.$get[cmd].earned.$get[l];$separate[$get[MC]]]]
        $addThumbnail[attachment://thumbnail.png]
      ]
      $if[$get[rarity]!=1;
        $addSeparator
        $addTextDisplay[$tl[ui.$get[cmd].rarity.$get[l];1;$get[rarity]]]
      ]
    ;$get[color]]
  `
})