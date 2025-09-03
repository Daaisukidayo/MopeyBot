import settingLobbyVars from '../../JSfunctions/lobby/settingVars.js'
import settingTagsContent from '../../JSfunctions/lobby/settingTagsContent.js'

export default {
  name: 'lobbySettingsEmbed',
  code: `
    ${settingLobbyVars()}
    ${settingTagsContent()}
    
    $addContainer[

      $addTextDisplay[# ⚙️ Settings]
      $addSeparator[Large]
      $addTextDisplay[### Mode: \`$get[lobbyMode]\`]
      $addTextDisplay[### Difficulty: \`$toTitleCase[$get[difficulty]]\`]
      $addTextDisplay[### Tags:\n**$codeBlock[$arrayJoin[tagsContent;\n]]**]

      $if[$authorID==$get[host];
        $addSeparator

        $addActionRow
        $addStringSelectMenu[addTagsLobby-$get[host];Choose Tags]
        $arrayForEach[tags;tag;
          $addOption[$env[allLobbyTagsContent;$env[tag]];(Toggle);$env[tag]]
        ]

        $addActionRow
        $addStringSelectMenu[addDifficultyLobby-$get[host];Choose Difficulty]
        $addOption[Disable Difficulty;(Select);none]
        $arrayForEach[difficulties;elem;
          $addOption[$toTitleCase[$env[elem]] Difficulty;(Select);$env[elem]]
        ]

        $addActionRow
        $addStringSelectMenu[switchLobbyMode-$get[host];Mode]
        
        $arrayForEach[modes;mode;
          $addOption[$env[mode];(Select);$env[mode]]
        ]

        $if[$arrayLength[allPlayers]>1;
          $addActionRow
          $!arraySplice[allPlayers;$arrayIndexOf[allPlayers;$get[host]];1]
          $addStringSelectMenu[giveLobbyHost-$get[host];Give Host]
          $arrayForEach[allPlayers;ID;
            $addOption[$username[$env[ID]];;$env[ID]]
          ]
        ]
      ]
    ;$getGlobalVar[luckyColor]]
  `
}