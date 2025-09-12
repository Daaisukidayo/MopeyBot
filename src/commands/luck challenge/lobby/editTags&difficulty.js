import universalSnippets from '#snippets/universalSnippets.js'
import lobbySnippets from '#snippets/lobbySnippets.js'

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

    ${lobbySnippets.lobbyExist()}
    ${lobbySnippets.loadGlobalLobbyVars()}
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
      ${lobbySnippets.deleteAllLobbyVars()}
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

        ${universalSnippets.settingTagsContent('lobbyTags')}
        $let[change;# Tags: \`$toTitleCase[$arrayJoin[tagsContent;, ]]\`]
      ]
    ]

    ${lobbySnippets.settingsChangePopUP('$get[change]')}
    
    $setChannelVar[lobby;$env[lobby]]

    ${lobbySnippets.loadLobbyVars()}
    ${lobbySnippets.lobbySettingsEmbed()}
    $interactionUpdate
    ${lobbySnippets.lobbyTimeout()}
  `
}