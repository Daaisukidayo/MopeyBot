import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "leaderboardEmbed",
  description: "a page of a leaderboard table w/ the page buttons and the table menu",
  params: [
    {
      name: "rowsVar",
      description: "var w/ the page's rows",
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
    $c[collection = every item across all 3 soccer games]
    $let[collectionSize;$math[$jsonSize[$readFile[res/data/pumpkins.json]] + $jsonSize[$readFile[res/data/umbrellas.json]] + $jsonSize[$readFile[res/data/beachballs.json]]]]

    $arrayMap[rows;elem;
      $let[pos;$getPositionEmoji[$jsonGet[elem;pos]]]
      $let[name;$username[$jsonGet[elem;user_id]]]
      $let[MUID;$jsonGet[elem;muid]]
      $if[$get[type]==mc;
        $return[$tl[ui.leaderboard.lines.mc.$get[l];$get[pos];$get[name];$get[MUID];$separate[$jsonGet[elem;mope_coins]]]]
      ]
      $if[$get[type]==collection;
        $return[$tl[ui.leaderboard.lines.collection.$get[l];$get[pos];$get[name];$get[MUID];$jsonGet[elem;collection];$get[collectionSize]]]
      ]
      $if[$isOneOf[$get[type];raretry;raretryrun];
        $return[$tl[ui.leaderboard.lines.rares.$get[l];$get[pos];$get[name];$get[MUID];$jsonGet[elem;$get[type]]]]
      ]
      $return[$tl[ui.leaderboard.lines.soccer.$get[l];$get[pos];$get[name];$get[MUID];$rollDisplay[$get[type];$jsonGet[elem;$get[type]_item]];$separate[$jsonGet[elem;$get[type]]]]]
    ;content]

    $addContainer[
      $attachment[res/assets/leaderboard/thumbnail.png;thumbnail.png]
      $addSection[
        $addTextDisplay[$tl[ui.leaderboard.title.$get[l]]\n$tl[ui.leaderboard.subtitle.$get[l];$tl[data.leaderboardTypes.$get[type].$get[l]]]]
        $addThumbnail[attachment://thumbnail.png]
      ]

      $addSeparator[Large]

      $addTextDisplay[$if[$jsonSize[content]>0;$arrayJoin[content;\n];$tl[ui.leaderboard.empty.$get[l]]]]

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
