import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'leaderboardEmbed',
  code: `
    $arrayMap[cachedLB;elem;
      $let[pos;$env[elem;pos]]
      $let[ID;$env[elem;ID]]
      $let[MC;$env[elem;MC]]
      $let[MUID;$env[elem;MUID]]

      $let[emoji;$function[
        $return[$switch[$get[pos];
          $case[1;🥇]
          $case[2;🥈]
          $case[3;🥉]
          $case[default;\`#$get[pos]\`]
        ]]
      ]]

      $return[$tl[ui.leaderboard.contentLine.$get[l];$get[emoji];$username[$get[ID]];$get[MUID];$separate[$get[MC]]]]
    ;content]
    
    $addContainer[
      $attachment[res/img/custom/leaderboard/thumbnail.png;thumbnail.png]
      $addSection[
        $addTextDisplay[$tl[ui.leaderboard.title.$get[l]]]
        $addThumbnail[attachment://thumbnail.png]
      ]

      $addSeparator[Large]

      $addTextDisplay[$arrayJoin[content;\n]]

      $if[$get[maxPages]>1;
        $addSeparator[Large]
        
        $addActionRow
        $addButton[leaderboard-prevPage-$get[page]-$get[rowsPerPage]-$authorID;;Primary;⬅️;$get[disabled]]
        $addButton[leaderboard-customPage-$get[page]-$get[rowsPerPage]-$authorID;$tl[ui.leaderboard.pageButton.$get[l];$get[page];$get[maxPages]];Primary;;$get[disabled]]
        $addButton[leaderboard-nextPage-$get[page]-$get[rowsPerPage]-$authorID;;Primary;➡️;$get[disabled]]
      ]
    ;$getGlobalVar[defaultColor]]
  `
})