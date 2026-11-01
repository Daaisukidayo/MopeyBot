import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "hallOfFameEmbed",
  description: "a page of the hall of fame, all games or just one",
  params: [
    {
      name: "filter",
      description: "'all' or a game from rollGames",
      type: ArgType.String,
    },
    {
      name: "page",
      description: "the page, wraps around when out of range",
      type: ArgType.Number,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[filter;$env[filter]]
    $jsonLoad[games;$getGlobalVar[rollGames]]
    $jsonLoad[entries;$getGlobalVar[hallOfFame]]
    $if[$get[filter]!=all;
      $arrayFilter[entries;entry;$jsonGet[entry;game]==$get[filter];entries]
    ]

    $c[pages wrap around]
    $let[pageSize;$getGlobalVar[hallOfFamePageSize]]
    $let[pages;$max[1;$arrayPageCount[entries;$get[pageSize]]]]
    $let[page;$if[$env[page]<1;$get[pages];$if[$env[page]>$get[pages];1;$env[page]]]]

    $c[place is counted in the shown list, which keeps the whole hall's order]
    $arrayMap[$arrayPage[entries;$get[page];$get[pageSize]];entry;
      $let[place;$math[($get[page] - 1) * $get[pageSize] + $env[i] + 1]]
      $return[$tl[ui.halloffame.line.$get[l];$getPositionEmoji[$get[place]];$rollDisplay[$jsonGet[entry;game];$jsonGet[entry;id]];$separate[$jsonGet[entry;chance]];$username[$jsonGet[entry;user]];$jsonGet[$getProfile[$jsonGet[entry;user]];muid];$tl[data.rollGames.$jsonGet[entry;game].$get[l]];$floor[$math[$jsonGet[entry;at] / 1000]]]]
    ;lines;i]

    $addContainer[
      $addTextDisplay[$tl[ui.halloffame.title.$get[l]]]
      $addTextDisplay[$tl[ui.halloffame.description.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$if[$jsonSize[lines]>0;$arrayJoin[lines;\n];$tl[ui.halloffame.empty.$get[l]]]]

      $if[$get[pages]>1;
        $addActionRow
        $addButton[halloffame-prevPage-$get[filter]-$get[page]-$authorID;;Primary;⬅️]
        $addButton[halloffame-page-$get[filter]-$get[page]-$authorID;$tl[ui.halloffame.pageButton.$get[l];$get[page];$get[pages]];Secondary;;true]
        $addButton[halloffame-nextPage-$get[filter]-$get[page]-$authorID;;Primary;➡️]
      ]
      $addActionRow
      $addStringSelectMenu[halloffame-filter-$authorID;$tl[ui.halloffame.filterMenu.$get[l]]]
      $addOption[$tl[ui.halloffame.allGames.$get[l]];;all;🏛️;$checkCondition[$get[filter]==all]]
      $arrayForEach[games;rollGame;
        $addOption[$tl[data.rollGames.$env[rollGame].$get[l]];;$env[rollGame];;$checkCondition[$env[rollGame]==$get[filter]]]
      ]
    ;$getGlobalVar[luckyColor]]
  `,
})
