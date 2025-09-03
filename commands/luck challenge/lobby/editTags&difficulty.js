import loadGlobalLobbyVars from "../../../JSfunctions/lobby/loadGlobalVars.js"
import loadLobbyVars from "../../../JSfunctions/lobby/loadVars.js"
import settingTagsContent from "../../../JSfunctions/lobby/settingTagsContent.js"

export default {
  type: 'interactionCreate',
  allowedInteractionTypes: ['selectMenu'],
  description: "when selecting Tags or Difficulty",
  code: `
    $arrayLoad[IID;-;$customID]
    $let[value;$selectMenuValues]
    $arrayLoad[passKeys;,;addDifficultyLobby,addTagsLobby]

    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
    $onlyIf[$arrayIncludes[IID;$authorID]]

    $callFunction[lobbyExist]
    ${loadGlobalLobbyVars()}
    $jsonLoad[lobby;$getChannelVar[lobby]]
    $jsonLoad[lobbyTags;$env[lobby;tags]]
    $let[host;$env[lobby;host]]

    $try[
      $!getMessage[$channelID;$env[lobby;messageID];id; ]
    ;
      $sendMessage[$channelID;
        $author[$username[$get[host]]'s Lobby;$userAvatar[$get[host]]]
        $description[# The lobby was closed due to a missing message]
        $color[Orange]
      ]
      $callFunction[deleteLobbyVars]
      $stop
    ]

    $switch[$arrayAt[IID;0];

      $case[$arrayAt[passKeys;0];
        $onlyIf[$env[lobby;difficulty]!=$get[value]]
        $!jsonSet[lobby;difficulty;$get[value]]
        $let[change;# Difficulty: \`$toTitleCase[$get[value]]\`]
      ]

      $case[$arrayAt[passKeys;1];
        $if[$arrayIncludes[lobbyTags;$get[value]];
          $!arraySplice[lobbyTags;$arrayIndexOf[lobbyTags;$get[value]];1]
        ;
          $arrayPush[lobbyTags;$get[value]]
        ]
        $!jsonSet[lobby;tags;$env[lobbyTags]]

        ${settingTagsContent()}
        $let[change;# Tags: \`$toTitleCase[$arrayJoin[tagsContent;, ]]\`]
      ]
    ]

    $callFunction[messageChangePopUP;$get[change]]
    
    $setChannelVar[lobby;$env[lobby]]
    ${loadLobbyVars()}
    $callFunction[lobbySettingsEmbed]
    $interactionUpdate
    $callFunction[lobbyTimeout]
  `
}