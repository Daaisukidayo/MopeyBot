import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "rollsEmbed",
  description: "a page of the user's roll history for a game: stats, best roll and the newest rolls",
  params: [
    {
      name: "rollsVar",
      description: "var w/ the user's Rolls",
      type: ArgType.String,
    },
    {
      name: "game",
      description: "the game, one of rollGames",
      type: ArgType.String,
    },
    {
      name: "page",
      description: "the page, wraps around when out of range",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[rolls;$env[rollsVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[game;$env[game]]
    $let[isRaretry;$isOneOf[$get[game];raretry;raretryrun]]
    $jsonLoad[stats;$callMethod[rolls;statsOf;$get[game]]]
    $jsonLoad[entries;$callMethod[rolls;historyOf;$get[game]]]

    $c[pages wrap around]
    $let[pageSize;$getGlobalVar[rollHistoryPageSize]]
    $let[pages;$max[1;$arrayPageCount[entries;$get[pageSize]]]]
    $let[page;$if[$env[page]<1;$get[pages];$if[$env[page]>$get[pages];1;$env[page]]]]

    $if[$get[isRaretry];
      $let[statsLine;$tl[ui.rolls.raretryStats.$get[l];$separate[$jsonGet[stats;plays]];$separate[$jsonGet[stats;rares]];$separate[$jsonGet[stats;mope_coins]]]]
    ;
      $let[statsLine;$tl[ui.rolls.soccerStats.$get[l];$separate[$jsonGet[stats;plays]];$jsonSize[stats;found];$jsonSize[$readFile[res/data/$get[game]s.json]];$separate[$jsonGet[stats;mope_coins]]]]
    ]
    $if[$jsonGet[stats;best]==;
      $let[bestLine;$tl[ui.rolls.noBest.$get[l]]]
    ;
      $let[bestLine;$tl[ui.rolls.best.$get[l];$rollDisplay[$get[game];$jsonGet[stats;best;id]];$separate[$jsonGet[stats;best;chance]];$floor[$math[$jsonGet[stats;best;at] / 1000]]]]
    ]

    $c[streaks show the count, raretry rolls their first few rares + how many more, soccers their item. coins only if there are any]
    $let[shown;$getGlobalVar[rollHistoryRaresShown]]
    $arrayMap[$arrayPage[entries;$get[page];$get[pageSize]];entry;
      $let[time;$floor[$math[$jsonGet[entry;at] / 1000]]]
      $let[coins;$if[$jsonGet[entry;mope_coins]>0;$tl[ui.rolls.coins.$get[l];$separate[$jsonGet[entry;mope_coins]]]]]
      $if[$jsonGet[entry;count]!=;
        $return[$tl[ui.rolls.streak.$get[l];$get[time];$if[$get[isRaretry];$tl[ui.rolls.nothingCaught.$get[l]];$rollDisplay[$get[game];$jsonGet[entry;item]]];$separate[$jsonGet[entry;count]];$get[coins]]]
      ]
      $if[$get[isRaretry];
        $arrayMap[$arraySlice[$jsonGet[entry;rares];;0;$get[shown]];rare;
          $return[$rollDisplay[$get[game];$jsonGet[rare;id]] \`1/$separate[$jsonGet[rare;chance]]\`]
        ;caught]
        $let[more;$math[$jsonSize[entry;rares] - $get[shown]]]
        $return[$tl[ui.rolls.raretryEntry.$get[l];$get[time];$arrayJoin[caught;, ]$if[$get[more]>0;$tl[ui.rolls.more.$get[l];$get[more]]];$get[coins]]]
      ]
      $return[$tl[ui.rolls.soccerEntry.$get[l];$get[time];$rollDisplay[$get[game];$jsonGet[entry;item]];$separate[$jsonGet[entry;chance]];$get[coins]]]
    ;lines]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.rolls.title.$get[l];$tl[data.rollGames.$get[game].$get[l]]]]
      $addTextDisplay[$get[statsLine]\n$get[bestLine]]
      $addSeparator[Large]
      $addTextDisplay[$if[$jsonSize[lines]>0;$arrayJoin[lines;\n];$tl[ui.rolls.empty.$get[l]]]]

      $if[$get[pages]>1;
        $addActionRow
        $addButton[rolls-prevPage-$get[game]-$get[page]-$authorID;;Primary;⬅️]
        $addButton[rolls-page-$get[game]-$get[page]-$authorID;$tl[ui.rolls.pageButton.$get[l];$get[page];$get[pages]];Secondary;;true]
        $addButton[rolls-nextPage-$get[game]-$get[page]-$authorID;;Primary;➡️]
      ]
      $addActionRow
      $addStringSelectMenu[rolls-game-$authorID;$tl[ui.rolls.gameMenu.$get[l]]]
      $arrayForEach[$getGlobalVar[rollGames];rollGame;
        $addOption[$tl[data.rollGames.$env[rollGame].$get[l]];;$env[rollGame];;$checkCondition[$env[rollGame]==$get[game]]]
      ]
    ;$getGlobalVar[defaultColor]]
  `,
})
