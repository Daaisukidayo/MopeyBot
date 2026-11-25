import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "leaderboardEmbed",
  description: "a page of a leaderboard table with the page buttons and the table menu",
  params: [
    {
      name: "rowsVar",
      description: "var with the page's rows",
      type: ArgType.String,
    },
    {
      name: "page",
      description: "the page number",
      type: ArgType.Number,
    },
    {
      name: "maxPages",
      description: "how many pages there are",
      type: ArgType.Number,
    },
    {
      name: "rowsPerPage",
      description: "how many rows per page",
      type: ArgType.Number,
    },
    {
      name: "type",
      description: "the table, a key of leaderboardTypes",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[rows;$env[rowsVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[page;$env[page]]
    $let[rowsPerPage;$env[rowsPerPage]]
    $let[type;$env[type]]

    $addContainer[
      $attachment[res/assets/leaderboard/thumbnail.png;thumbnail.png]
      $addSection[
        $addTextDisplay[$tl[ui.leaderboard.title.$get[l]]\n$tl[ui.leaderboard.subtitle.$get[l];$tl[data.leaderboardTypes.$get[type].$get[l]]]]
        $addThumbnail[attachment://thumbnail.png]
      ]

      $addSeparator[Large]

      $if[$jsonSize[rows]>0;
        $c[the rows as text for screen readers: place, name, the table's number (soccers as 1/chance)]
        $let[key;$if[$get[type]==mc;mope_coins;$get[type]]]
        $let[prefix;$if[$isOneOf[$get[type];pumpkin;umbrella;beachball];1/]]
        $let[alt;$arrayJoin[$arrayMap[rows;elem;$return[$jsonGet[elem;pos]. $username[$jsonGet[elem;user_id]]#$jsonGet[elem;muid]: $get[prefix]$jsonGet[elem;$get[key]]]];, ]]
        $addMediaGallery[$addMediaItem[$leaderboardCard[rows;$get[type]];$get[alt]]]
      ;
        $addTextDisplay[$tl[ui.leaderboard.empty.$get[l]]]
      ]

      $addSeparator[Large]
      $if[$env[maxPages]>1;
        $addActionRow
        $addButton[leaderboard-prevPage-$get[page]-$get[rowsPerPage]-$get[type]-$authorID;;Primary;⬅️]
        $addButton[leaderboard-customPage-$get[page]-$get[rowsPerPage]-$get[type]-$authorID;$tl[ui.leaderboard.pageButton.$get[l];$get[page];$env[maxPages]];Primary]
        $addButton[leaderboard-nextPage-$get[page]-$get[rowsPerPage]-$get[type]-$authorID;;Primary;➡️]
      ]
      $addActionRow
      $addStringSelectMenu[leaderboard-type-$get[page]-$get[rowsPerPage]-$get[type]-$authorID;$tl[ui.leaderboard.typeMenu.$get[l]]]
      $arrayForEach[$jsonKeys[$getGlobalVar[leaderboardTypes]];table;
        $addOption[$tl[data.leaderboardTypes.$env[table].$get[l]];;$env[table];;$checkCondition[$env[table]==$get[type]]]
      ]
    ;$getGlobalVar[defaultColor]]
  `,
})
