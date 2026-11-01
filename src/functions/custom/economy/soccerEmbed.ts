import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "soccerEmbed",
  code: `
    $defer

    $let[l;$jsonGet[userProfile;language]]
    $let[cmd;$commandName]

    $jsonLoad[soccerData;$readFile[res/data/$get[cmd]s.json]]

    $let[lastI;$math[$jsonSize[soccerData] - 1]]
    $let[arg;$message]

    $let[target;$if[$and[$get[arg]!=;$isNumber[$get[arg]];$isDev;$get[arg]>-1;$get[arg]<=$get[lastI]];$get[arg];-1]]

    $c[rarest first, first 1/rarity hit wins and the last one (rarity 1) always hits. devs can pick the item by ID]
    $jsonLoad[data;$arrayFind[soccerData;item;$or[$jsonGet[item;id]==$get[target];$and[$get[target]==-1;$randomNumber[1;$math[$jsonGet[item;rarity] + 1]]==1]]]]

    $let[rarity;$jsonGet[data;rarity]]
    $attachment[res/assets/soccer/$get[cmd]s/$jsonGet[data;id].png;thumbnail.png]
    $let[MC;$random[$jsonGet[data;mope_coins;0];$jsonGet[data;mope_coins;1]]]
    $let[display;$tl[data.$get[cmd]s.$jsonGet[data;id].$get[l]]]
    $let[color;$jsonGet[data;color]]

    $callMethod[userProfile;addCoins;$get[MC]]
    $callMethod[userProfile;save]

    $c[log it to history/stats unless a dev forced the item, recordDevRolls turns that off for testing]
    $if[$or[$get[target]==-1;$getGlobalVar[recordDevRolls]];
      $recordRoll[$get[cmd];$objectOf[at;$getTimestamp;item;$jsonGet[data;id];chance;$get[rarity];mope_coins;$get[MC]]]
    ]

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
  `,
})
